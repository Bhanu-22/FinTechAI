import Navbar from "@/components/layout/Navbar";
import Hero from "@/features/landing/components/Hero";
import BrandMarquee from "@/features/landing/components/BrandMarquee";
import FeaturesGrid from "@/features/landing/components/FeaturesGrid";
import Pricing from "@/features/landing/components/Pricing";
import Testimonials from "@/features/landing/components/Testimonials";
import FAQ from "@/features/landing/components/FAQ";
import Footer from "@/components/layout/Footer";
import ThemeSwitcher from "@/components/layout/ThemeSwitcher";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-transparent">
      {/* Background is now global in layout.tsx */}

      {/* Content at z-10 */}
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <BrandMarquee />
        <FeaturesGrid />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Footer />
      </div>
      <ThemeSwitcher />
    </main>
  );
}
