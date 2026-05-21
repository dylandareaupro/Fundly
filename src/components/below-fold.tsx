"use client";

import dynamic from "next/dynamic";

// Deep below-the-fold sections, code-split AND deferred off the initial load.
// The dynamic import lives in a Client Component on purpose: Next 16 does NOT
// code-split when a Server Component dynamically imports a Client Component
// (see node_modules/next/dist/docs/.../lazy-loading.md).
//
// `ssr: false` skips prerendering these on the server so their JS isn't
// downloaded/parsed on first paint — it loads right after hydration, while the
// user is still looking at the hero. These sections sit far down the page, so
// they're always mounted long before the user scrolls to them (no pop-in), and
// the SEO-critical content stays above in the SSR'd hero. Saves ~25 KB gzip /
// ~80 KB raw off the critical-path JS.
const Manifesto = dynamic(
  () => import("@/components/sections/manifesto").then((m) => m.Manifesto),
  { ssr: false }
);
const ImpactDashboard = dynamic(
  () =>
    import("@/components/sections/impact-dashboard").then(
      (m) => m.ImpactDashboard
    ),
  { ssr: false }
);
const Faq = dynamic(
  () => import("@/components/sections/faq").then((m) => m.Faq),
  { ssr: false }
);
const DownloadHero = dynamic(
  () => import("@/components/sections/download-hero").then((m) => m.DownloadHero),
  { ssr: false }
);
const Footer = dynamic(
  () => import("@/components/sections/footer").then((m) => m.Footer),
  { ssr: false }
);

export function BelowFold() {
  return (
    <>
      <Manifesto />
      <ImpactDashboard />
      <Faq />
      <DownloadHero />
      <Footer />
    </>
  );
}
