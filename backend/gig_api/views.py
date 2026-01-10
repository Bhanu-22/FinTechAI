from rest_framework import viewsets, permissions, status
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Sum, Count
from django.http import JsonResponse
from datetime import date as dt_date
from decimal import Decimal
from .models import Shift, Expense, SavingsGoal
from .models import Shift, Expense, SavingsGoal
from .serializers import ShiftSerializer, ExpenseSerializer, SavingsGoalSerializer
from .services.sms_integration import SMSIntegrationService

sms_service = SMSIntegrationService()

class ShiftViewSet(viewsets.ModelViewSet):
    serializer_class = ShiftSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Row Level Security: Users only see their own shifts
        # ActiveManager filtering: Only show non-archived shifts
        queryset = Shift.active_objects.filter(user=self.request.user)
        
        # Support filtering by date
        date_param = self.request.query_params.get('date')
        if date_param:
            queryset = queryset.filter(date=date_param)
            
        return queryset

    def perform_create(self, serializer):
        # Role-Based Access Control: Only GIG_WORKERs can log shifts
        if self.request.user.role != 'GIG_WORKER':
            raise PermissionDenied("Only Gig Workers can log shifts.")
        
        # Custom Shift Logic (if any)
        pass
            
        serializer.save(user=self.request.user)

    def perform_destroy(self, instance):
        # Soft delete instead of hard delete
        from django.utils import timezone
        instance.archived_at = timezone.now()
        instance.save()

class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # ActiveManager filtering
        queryset = Expense.active_objects.filter(user=self.request.user)
        shift_id = self.request.query_params.get('shift')
        if shift_id:
            queryset = queryset.filter(shift_id=shift_id)
        return queryset

    def perform_create(self, serializer):
        if self.request.user.role != 'GIG_WORKER':
             raise PermissionDenied("Only Gig Workers can log expenses.")
        
        # Validation: Ensure linked shift belongs to the user
        shift = serializer.validated_data.get('shift')
        if shift and shift.user != self.request.user:
             raise ValidationError({"shift": "You cannot link expenses to another user's shift."})
             
        serializer.save(user=self.request.user)

    def perform_destroy(self, instance):
        # Soft delete instead of hard delete
        from django.utils import timezone
        instance.archived_at = timezone.now()
        instance.save()

class SavingsGoalViewSet(viewsets.ModelViewSet):
    serializer_class = SavingsGoalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavingsGoal.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        # Role Check
        if request.user.role != 'GIG_WORKER':
            raise PermissionDenied("Only Gig Workers can set savings goals.")
        
        # Upsert Logic
        date = request.data.get('date')
        if not date:
            raise ValidationError({"date": "Date is required."})
            
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Update if exists, else Create
        goal, created = SavingsGoal.objects.update_or_create(
            user=request.user,
            date=date,
            defaults={'daily_target_amount': serializer.validated_data['daily_target_amount']}
        )
        
        status_code = status.HTTP_201_CREATED if created else status.HTTP_200_OK
        return Response(SavingsGoalSerializer(goal).data, status=status_code)

from django.db.models import Sum, Count
from rest_framework.decorators import api_view, permission_classes
from datetime import date as dt_date
from decimal import Decimal

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def daily_summary_view(request):
    # Role Check
    if request.user.role != 'GIG_WORKER':
        return Response({"detail": "Only Gig Workers can access this data."}, status=status.HTTP_403_FORBIDDEN)

    # 1. Parse Date
    date_str = request.query_params.get('date')
    if date_str:
        try:
            target_date = dt_date.fromisoformat(date_str)
        except ValueError:
            return Response({"detail": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)
    else:
        target_date = dt_date.today()

    # 2. Aggregations (Earnings & Expenses)
    # Earnings: Sum of shifts for this user on this date (EXCLUDE ARCHIVED)
    earnings_agg = Shift.active_objects.filter(user=request.user, date=target_date).aggregate(total=Sum('earnings_amount'))
    earnings_total = earnings_agg['total'] or Decimal('0.00')

    # Platform Breakdown
    platform_breakdown = (
        Shift.active_objects.filter(
            user=request.user,
            date=target_date
        )
        .values('platform')
        .annotate(
            total_earnings=Sum('earnings_amount'),
            shift_count=Count('id')
        )
        .order_by('-total_earnings')
    )

    # Expenses: Link via Shift OR direct link to user for date (EXCLUDE ARCHIVED EXPENSES AND EXPENSES OF ARCHIVED SHIFTS)
    # We sum expenses linked to the shifts of that date.
    expenses_agg = Expense.active_objects.filter(
        shift__user=request.user, 
        shift__date=target_date, 
        shift__archived_at__isnull=True
    ).aggregate(total=Sum('amount'))
    expenses_total = expenses_agg['total'] or Decimal('0.00')

    net_income = earnings_total - expenses_total

    # 3. Savings Goal
    goal = SavingsGoal.objects.filter(user=request.user, date=target_date).first()
    goal_data = None
    if goal:
        target = goal.daily_target_amount
        progress = Decimal('0.0')
        if target > 0:
            # High Precision Calculation
            progress = (net_income / target) * 100
        
        goal_data = {
            "target": target,
            "progress_percentage": round(progress, 1),
            "status": "On Track" if net_income >= target else "Behind"
        }

    # 4. Response
    return Response({
        "date": target_date,
        "currency": "INR",
        "earnings_total": earnings_total,
        "expenses_total": expenses_total,
        "net_income": net_income,
        "savings_goal": goal_data,
        "platform_breakdown": list(platform_breakdown)
    })

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def habit_status_view(request):
    # Role Check
    if request.user.role != 'GIG_WORKER':
        return Response({"detail": "Only Gig Workers can access this data."}, status=status.HTTP_403_FORBIDDEN)

    target_date = dt_date.today()
    
    # 1. Shift Logged Today?
    shift_logged = Shift.active_objects.filter(user=request.user, date=target_date).exists()
    
    # 2. Expenses Logged Today? (Must be linked to user, either directly or via shift for today)
    # The requirement is "at least one Expense record is linked to the user's shift today"
    expenses_logged = Expense.active_objects.filter(
        shift__user=request.user,
        shift__date=target_date,
        shift__archived_at__isnull=True
    ).exists()

    # 3. Savings Goal Set Today?
    goal_set = SavingsGoal.objects.filter(user=request.user, date=target_date).exists()
    
    # Composite Metric
    day_completed = shift_logged and expenses_logged and goal_set
    
    return Response({
        "shift_logged_today": shift_logged,
        "expenses_logged_today": expenses_logged,
        "savings_goal_set_today": goal_set,
        "day_completed": day_completed
    })

    return Response({
        "shift_logged_today": shift_logged,
        "expenses_logged_today": expenses_logged,
        "savings_goal_set_today": goal_set,
        "day_completed": day_completed
    })

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def parse_sms_view(request):
    if request.user.role != 'GIG_WORKER':
        return Response({"detail": "Only Gig Workers can parse SMS."}, status=status.HTTP_403_FORBIDDEN)
    
    sms_body = request.data.get('sms_body')
    if not sms_body:
        return Response({"detail": "SMS body is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    result = sms_service.parse_sms(sms_body)
    if result:
        return Response(result)
    else:
        return Response({"detail": "Could not parse SMS. Format not recognized."}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def confirm_sms_view(request):
    if request.user.role != 'GIG_WORKER':
        return Response({"detail": "Only Gig Workers can confirm shifts."}, status=status.HTTP_403_FORBIDDEN)
        
    parsed_data = request.data
    # Basic validation
    required_fields = ['platform', 'amount', 'date']
    if not all(k in parsed_data for k in required_fields):
        return Response({"detail": "Invalid payload."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        shift = sms_service.confirm_and_create_shift(parsed_data, request.user.id)
        return Response(ShiftSerializer(shift).data, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

def gig_welcome(request):
    return JsonResponse({"message": "Welcome to the Gig Worker API"})
