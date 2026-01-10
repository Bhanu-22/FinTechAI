from decimal import Decimal
from django.db import transaction
from ..models import Shift
from .sms_parser import SMSParserService

class SMSIntegrationService:
    def __init__(self):
        self.parser = SMSParserService()

    def parse_sms(self, sms_body: str):
        return self.parser.parse_sms(sms_body)

    @transaction.atomic
    def confirm_and_create_shift(self, parsed_data: dict, user_id: int) -> Shift:
        return Shift.active_objects.create(
            user_id=user_id,
            date=parsed_data["date"],
            earnings_amount=Decimal(parsed_data["amount"]),
            platform=parsed_data["platform"],
        )
