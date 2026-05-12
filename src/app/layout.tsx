import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Cursor } from "@/components/cursor";
import { ScrollProgress } from "@/components/scroll-progress";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fundly — La banque de la nouvelle génération",
  description:
    "Virements blockchain instantanés, zéro frais caché, et chaque dépense compense votre empreinte carbone. La banque pour celles et ceux qui veulent que leur argent ait du sens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${jakarta.variable} cursor-hidden`}>
      <body className="antialiased overflow-x-clip">
        <SmoothScroll>{children}</SmoothScroll>
        <ScrollProgress />
        <Cursor />
        <Toaster
          theme="light"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#fff",
              color: "var(--fg-primary)",
              border: "1px solid var(--border-light)",
            },
          }}
        />
      </body>
    </html>
  );
}
