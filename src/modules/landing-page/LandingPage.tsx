"use client";

import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import HowItWorksSection from "./HowItWorksSection";
import FeaturesSection from "./FeaturesSection";
import FaqSection from "./FaqSection";
import FooterSection from "./FooterSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-ivory text-text-primary font-sans">
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <FeaturesSection />
      <FaqSection />
      <FooterSection />
    </div>
  );
}
