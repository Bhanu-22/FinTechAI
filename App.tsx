import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, TouchableOpacity, Alert, Platform } from 'react-native';
import { PersonaCard } from './src/components/PersonaCard';
import { FeatureVisual } from './src/components/FeatureVisuals';
import { AISection } from './src/components/AISection';
import { PERSONA_DATA, HERO_HEADLINE, HERO_SUBHEAD, HERO_TAGLINE } from './src/data/content';
import { COLORS } from './src/constants/theme';
import { Star } from 'lucide-react-native';

export default function App() {
  const handleGetStarted = () => Alert.alert("Success", "Welcome to FinanceAI!");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* NAVBAR */}
      <View style={styles.nav}>
        <Text style={styles.logo}>FinanceAI</Text>
        <TouchableOpacity onPress={handleGetStarted} style={styles.navBtn}>
          <Text style={styles.navBtnText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        
        {/* 1. HERO SECTION */}
        <View style={styles.hero}>
          <Text style={styles.tag}>{HERO_TAGLINE}</Text>
          <Text style={styles.title}>{HERO_HEADLINE}</Text>
          <Text style={styles.sub}>{HERO_SUBHEAD}</Text>
        </View>

        {/* 2. HERO CARDS (The 3 Pillars) */}
        <View style={styles.grid}>
          {PERSONA_DATA.map((persona) => (
            <PersonaCard key={persona.id} data={persona} variant="hero" />
          ))}
        </View>

        {/* 3. FEATURE DEEP DIVE (Visuals) */}
        <View style={styles.sectionDark}>
          <Text style={styles.sectionHeader}>Built for India's Workforce</Text>
          <View style={styles.grid}>
            {PERSONA_DATA.map((persona) => (
              <View key={persona.id} style={styles.visualCard}>
                <Text style={{ color: persona.color, fontWeight: 'bold', marginBottom: 5 }}>{persona.title}</Text>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>{persona.subtitle.split('.')[0]}</Text>
                <FeatureVisual type={persona.type} color={persona.color} />
                <TouchableOpacity><Text style={{ color: persona.color, fontWeight: 'bold' }}>See Demo →</Text></TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* 4. AI INTELLIGENCE */}
        <AISection />

        {/* 5. TESTIMONIALS */}
        <View style={styles.sectionLight}>
          <Text style={styles.sectionHeader}>Loved by 10,000+ Indians</Text>
          <View style={styles.testimonial}>
            <View style={{flexDirection:'row', marginBottom:16, gap:4}}>
               {[1,2,3,4,5].map(i => <Star key={i} fill="#FBBF24" color="#FBBF24" size={16}/>)}
            </View>
            <Text style={styles.quote}>"Mera loan approve ho gaya! Income Certificate ki wajah se bank ko proof mil gaya. Thank you FinanceAI!"</Text>
            <Text style={styles.author}>Rajesh Kumar, Uber Driver 🇮🇳</Text>
          </View>
        </View>

        {/* 6. PRICING */}
        <View style={styles.sectionDark}>
           <Text style={styles.sectionHeader}>Simple, Transparent Pricing</Text>
           <View style={styles.grid}>
              {PERSONA_DATA.map((persona) => (
                 <PersonaCard key={persona.id} data={persona} variant="pricing" />
              ))}
           </View>
        </View>

        {/* FAT FOOTER */}
        <View style={styles.fatFooter}>
          <View style={styles.footerCol}>
            <Text style={styles.footerBrand}>FinanceAI</Text>
            <Text style={styles.footerSub}>Financial OS for India.</Text>
          </View>
          <View style={styles.footerCol}>
            <Text style={styles.footerHead}>Product</Text>
            <Text style={styles.footerLink}>For Drivers</Text>
            <Text style={styles.footerLink}>For Merchants</Text>
            <Text style={styles.footerLink}>Pricing</Text>
          </View>
          <View style={styles.footerCol}>
            <Text style={styles.footerHead}>Company</Text>
            <Text style={styles.footerLink}>About Us</Text>
            <Text style={styles.footerLink}>Careers</Text>
          </View>
          <View style={styles.footerCol}>
            <Text style={styles.footerHead}>Legal</Text>
            <Text style={styles.footerLink}>Privacy</Text>
            <Text style={styles.footerLink}>Terms</Text>
          </View>
        </View>
        <View style={styles.fatFooter}>
          <Text style={{color: '#555'}}>© 2026 FinanceAI. Made with ❤️ in India.</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  nav: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 20, borderBottomWidth: 1, borderBottomColor: '#222', backgroundColor: COLORS.background 
  },
  logo: { color: 'white', fontSize: 22, fontWeight: '900' },
  navBtn: { backgroundColor: '#6C63FF', padding: 10, borderRadius: 8 },
  navBtnText: { color: 'white', fontWeight: 'bold' },
  scroll: { paddingBottom: 50 },
  hero: { alignItems: 'center', paddingVertical: 60, paddingHorizontal: 20 },
  tag: { color: '#6C63FF', fontWeight: 'bold', marginBottom: 10, letterSpacing: 1, fontSize: 10, textAlign:'center' },
  title: { color: 'white', fontSize: 42, fontWeight: '800', textAlign: 'center', marginBottom: 16, maxWidth: 800 },
  sub: { color: '#A1A1AA', fontSize: 18, textAlign: 'center', maxWidth: 600 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 1200, alignSelf: 'center' },
  sectionDark: { paddingVertical: 80, alignItems: 'center', width: '100%' },
  sectionLight: { paddingVertical: 60, alignItems: 'center', backgroundColor: '#13141C' },
  sectionHeader: { fontSize: 32, fontWeight: 'bold', color: 'white', marginBottom: 40, textAlign:'center' },
  visualCard: { backgroundColor: '#13141C', padding: 24, borderRadius: 16, width: 350, margin: 10, borderWidth: 1, borderColor: '#333' },
  testimonial: { padding: 32, backgroundColor: '#0B0C15', borderRadius: 16, maxWidth: 600, borderWidth: 1, borderColor: '#333' },
  quote: { color: 'white', fontSize: 18, fontStyle: 'italic', marginBottom: 20, lineHeight: 28 },
  author: { color: '#888', fontWeight: 'bold' },
  fatFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 60,
    backgroundColor: '#0B0C15',
    borderTopWidth: 1,
    borderTopColor: '#222',
    gap: 40,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%'
  },
  footerCol: { minWidth: 150 },
  footerBrand: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  footerSub: { color: '#888', fontSize: 14 },
  footerHead: { color: 'white', fontWeight: 'bold', marginBottom: 16 },
  footerLink: { color: '#666', marginBottom: 12, fontSize: 14 },
});