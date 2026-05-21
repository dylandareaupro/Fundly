import { Header } from "@/components/sections/header";
import { HeroFlight } from "@/components/sections/hero-flight";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ThreePrinciples } from "@/components/sections/three-principles";
import { CardShowcase } from "@/components/sections/card-showcase";
import { OnePrice } from "@/components/sections/one-price";
import { BelowFold } from "@/components/below-fold";

export default function Home() {
  return (
    <main className="relative overflow-x-clip bg-[var(--bg-base)]">
      <Header />
      <HeroFlight />
      <HowItWorks />
      <ThreePrinciples />
      <CardShowcase />
      <OnePrice />
      {/* Manifesto · ImpactDashboard · Faq · DownloadHero · Footer
          are code-split (see below-fold.tsx) to keep initial JS lean. */}
      <BelowFold />
    </main>
  );
}
