import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Brain, CloudRain, Lightbulb } from 'lucide-react-native';

const InsightCard = ({ icon: Icon, text, color }: any) => (
  <View style={[styles.card, { borderLeftColor: color }]}>
    <Icon size={24} color={color} style={{marginBottom: 12}} />
    <Text style={styles.cardText}>{text}</Text>
  </View>
);

export const AISection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>AI-POWERED</Text>
      <Text style={styles.title}>Intelligence, Not Just Tracking</Text>
      <View style={styles.grid}>
        <InsightCard icon={Brain} color="#10B981" text='"You earned ₹1,200 less this week. Switch to dinner hours for 18% higher earnings."' />
        <InsightCard icon={CloudRain} color="#F97316" text='"Heavy rain predicted. Stock up on Maggi & Chai. Sales spike 34%."' />
        <InsightCard icon={Lightbulb} color="#8B5CF6" text='"Tax Loss Harvest available: ₹15,000. Offset your stock gains and save."' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 40, alignItems: 'center', backgroundColor: '#0B0C15' },
  label: { color: '#6C63FF', fontWeight: 'bold', fontSize: 12, letterSpacing: 1.5, marginBottom: 10 },
  title: { color: 'white', fontSize: 32, fontWeight: 'bold', marginBottom: 40, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 20, justifyContent: 'center' },
  card: { backgroundColor: '#13141C', padding: 24, borderRadius: 12, width: 300, borderLeftWidth: 4 },
  cardText: { color: '#D4D4D8', fontSize: 14, lineHeight: 22 }
});