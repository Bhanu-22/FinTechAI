import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Car, Store, Laptop, CheckCircle } from 'lucide-react-native';
import { COLORS } from '../constants/theme';

interface PersonaCardProps {
  data: any;
  variant?: 'hero' | 'pricing';
}

const ICON_MAP: any = { driver: Car, merchant: Store, freelancer: Laptop };

export const PersonaCard = ({ data, variant = 'hero' }: PersonaCardProps) => {
  const Icon = ICON_MAP[data.type];
  const isPricing = variant === 'pricing';
  const isPopular = variant === 'pricing' && data.type === 'merchant';

  return (
    <View style={[styles.card, { borderColor: isPricing ? COLORS.ui.border : data.color }]}>
        {/* NEW: The Most Popular Badge */}
      {isPopular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>MOST POPULAR</Text>
        </View>
      )}
      
      {/* 1. Icon Header */}
      {!isPricing && (
        <View style={[styles.iconHeader, { backgroundColor: `${data.color}20` }]}>
          <Icon size={24} color={data.color} />
          <Text style={[styles.badge, { color: data.color }]}>{data.title.toUpperCase()}</Text>
        </View>
      )}

      {/* 2. Content */}
      {isPricing ? (
         <View>
            <Text style={[styles.pricingRole, { color: data.color }]}>{data.title.toUpperCase()}</Text>
            <Text style={styles.heroCopy}>{data.price}</Text>
            <Text style={styles.period}>{data.period}</Text>
         </View>
      ) : (
        <View>
          <Text style={styles.heroCopy}>{data.heroCopy}</Text>
          <Text style={styles.subtitle}>{data.subtitle}</Text>
        </View>
      )}

      {/* 3. Features List */}
      <View style={styles.features}>
        {data.features.map((feat: string, i: number) => (
          <View key={i} style={styles.featureRow}>
            <CheckCircle size={16} color={data.color} />
            <Text style={styles.featureText}>{feat}</Text>
          </View>
        ))}
      </View>

      {/* 4. CTA Button */}
      <TouchableOpacity style={[styles.cta, { backgroundColor: data.color }]}>
        <Text style={styles.ctaText}>{data.cta}</Text>
      </TouchableOpacity>
      
      {isPricing && <Text style={styles.guarantee}>No credit card required</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#13141C',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    flex: 1,
    minWidth: 300,
    maxWidth: 400,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  iconHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  badge: { fontWeight: 'bold', fontSize: 12, marginLeft: 8, letterSpacing: 1 },
  heroCopy: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { color: '#A1A1AA', fontSize: 14, marginBottom: 24, lineHeight: 20 },
  pricingRole: { fontWeight: 'bold', fontSize: 12, marginBottom: 8, letterSpacing: 1 },
  period: { color: '#A1A1AA', fontSize: 14, marginBottom: 24 },
  features: { marginBottom: 24, gap: 12 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  featureText: { color: '#D4D4D8', fontSize: 14 },
  cta: { paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  ctaText: { color: '#000', fontWeight: '700', fontSize: 15 },
  guarantee: { color: '#52525B', fontSize: 10, textAlign: 'center', marginTop: 12 },
  popularBadge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    backgroundColor: '#FBBF24', // Amber/Yellow
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 10,
  },
  popularText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 10,
  }
});