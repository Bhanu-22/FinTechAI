import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandMarquee from "@/components/BrandMarquee";
import FeaturesGrid from "@/components/FeaturesGrid";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";

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
