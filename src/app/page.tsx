import { Header } from "@/components/sections/header";
import { HeroFlight } from "@/components/sections/hero-flight";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ThreePrinciples } from "@/components/sections/three-principles";
import { CardShowcase } from "@/components/sections/card-showcase";
import { OnePrice } from "@/components/sections/one-price";
import { Manifesto } from "@/components/sections/manifesto";
import { ImpactDashboard } from "@/components/sections/impact-dashboard";
import { Faq } from "@/components/sections/faq";
import { DownloadHero } from "@/components/sections/download-hero";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="relative overflow-x-clip bg-[var(--bg-base)]">
      <Header />
      <HeroFlight />
      <HowItWorks />
      <ThreePrinciples />
      <CardShowcase />
      <OnePrice />
      <Manifesto />
      <ImpactDashboard />
      <Faq />
      <DownloadHero />
      <Footer />
    </main>
  );
}
