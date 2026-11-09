import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import SmoothScrollProvider from "@/components/animations/SmoothScrollProvider";
import ScrollProgressIndicator from "@/components/animations/ScrollProgressIndicator";
import CursorGlow from "@/components/animations/CursorGlow";
import { buildMetadata } from "@/lib/seo";
import { env } from "@/lib/env";
import { toJsonLdScript } from "@/lib/jsonLd";
import { getOrganizationJsonLd, getWebSiteJsonLd } from "@/lib/structuredData";
import "./globals.css";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap"
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap"
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap"
});
export const metadata = {
  metadataBase: new URL(env.siteUrl),
  ...buildMetadata()
};
export default function RootLayout({
  children
}) {
  return <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ink text-fg">
        <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: toJsonLdScript(getOrganizationJsonLd())
      }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: toJsonLdScript(getWebSiteJsonLd())
      }} />
        <SmoothScrollProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-fg">
            Skip to content
          </a>
          <ScrollProgressIndicator />
          <CursorGlow />
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </SmoothScrollProvider>
      </body>
    </html>;
}
