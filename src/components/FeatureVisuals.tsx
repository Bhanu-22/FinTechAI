import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FileText, Mic, Check, X } from 'lucide-react-native';

export const FeatureVisual = ({ type, color }: { type: string, color: string }) => {
  
  // 1. DRIVER: Income Certificate
  if (type === 'driver') {
    return (
      <View style={styles.container}>
        <View style={[styles.certCard, { borderColor: color }]}>
          <View style={styles.certHeader}>
            <FileText size={16} color={color} />
            <Text style={[styles.certTitle, { color }]}>Income Certificate</Text>
            <View style={[styles.badge, { backgroundColor: color }]}><Check size={10} color="black"/></View>
          </View>
          <Text style={styles.certLabel}>MONTHLY INCOME</Text>
          <Text style={[styles.certValue, { color }]}>₹28,500</Text>
          <View style={styles.progressBar}><View style={[styles.progressFill, { backgroundColor: color, width: '80%' }]} /></View>
          <View style={[styles.downloadBtn, { backgroundColor: color }]}>
             <Text style={styles.btnText}>Download Certified PDF</Text>
          </View>
        </View>
      </View>
    );
  }

  // 2. MERCHANT: Voice Pulse
  if (type === 'merchant') {
    return (
      <View style={styles.container}>
        <View style={[styles.micCircle, { borderColor: color }]}>
           <Mic size={32} color="white" />
        </View>
        <Text style={{color:'#666', marginTop: 12, fontStyle:'italic'}}>Listening...</Text>
        <View style={styles.transcriptBox}>
            <Text style={{color: 'white'}}>"Added 50 Amul Milk"</Text>
        </View>
      </View>
    );
  }

  // 3. FREELANCER: Swipe Cards
  if (type === 'freelancer') {
    return (
      <View style={styles.container}>
        <View style={[styles.swipeCard, { transform: [{rotate: '-5deg'}], opacity: 0.5, top: 10 }]} />
        <View style={styles.swipeCard}>
           <View style={[styles.tag, {backgroundColor: '#F59E0B'}]}><Text style={styles.tagText}>AWS Bill</Text></View>
           <Text style={styles.billAmount}>₹4,500.00</Text>
           <Text style={styles.billDate}>Dec 15 • Recurring</Text>
           <View style={styles.actions}>
              <View style={[styles.roundBtn, {borderColor: '#EF4444'}]}><X size={20} color="#EF4444"/></View>
              <View style={[styles.roundBtn, {borderColor: '#10B981', backgroundColor: '#10B98120'}]}><Check size={20} color="#10B981"/></View>
           </View>
        </View>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: { height: 180, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', borderRadius: 12, marginVertical: 20, overflow: 'hidden' },
  // Driver
  certCard: { width: '80%', padding: 16, borderRadius: 8, borderWidth: 1, backgroundColor: '#111' },
  certHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  certTitle: { fontWeight: 'bold', fontSize: 12 },
  badge: { width: 16, height: 16, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  certLabel: { color: '#666', fontSize: 10, letterSpacing: 1 },
  certValue: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  progressBar: { height: 4, backgroundColor: '#333', borderRadius: 2, marginBottom: 16 },
  progressFill: { height: '100%', borderRadius: 2 },
  downloadBtn: { padding: 8, borderRadius: 4, alignItems: 'center' },
  btnText: { fontSize: 10, fontWeight: 'bold' },
  // Merchant
  micCircle: { width: 64, height: 64, borderRadius: 32, borderWidth: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9731620' },
  transcriptBox: { marginTop: 12, backgroundColor: '#222', padding: 8, borderRadius: 6 },
  // Freelancer
  swipeCard: { width: 160, height: 130, backgroundColor: '#1F2937', borderRadius: 12, position: 'absolute', alignItems: 'center', padding: 16, borderWidth: 1, borderColor: '#374151' },
  tag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, marginBottom: 12 },
  tagText: { fontSize: 10, fontWeight: 'bold', color: 'black' },
  billAmount: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  billDate: { color: '#9CA3AF', fontSize: 10, marginBottom: 16 },
  actions: { flexDirection: 'row', gap: 24 },
  roundBtn: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }
});