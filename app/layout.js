import "./globals.css";
import { Montserrat, Nunito, Noto_Serif_JP } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import IntroSplash from "../components/IntroSplash";
import { IconWhatsApp } from "../components/icons";
import { WHATSAPP_LINK } from "../lib/content";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["800", "900"],
  variable: "--font-num",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin", "japanese"],
  weight: ["700"],
  variable: "--font-noto-jp",
  display: "swap",
});

const SITE_URL = "https://ikigaicoding.com"; // placeholder domain

export const metadata = {
  
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ikigaicoding — Custom Software, Websites & Search (SEO · GEO · AEO)",
    template: "%s | ikigaicoding",
  },
  description:
    "ikigaicoding builds custom software, websites that convert, and search visibility (SEO, GEO, AEO) for businesses that refuse to give up. Fall seven times, get up eight.",
  openGraph: {
    type: "website",
    siteName: "ikigaicoding",
    images: [{ url: "/assets/hero-bg.png" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/assets/icon.svg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${nunito.variable} ${notoSerifJP.variable}`}>
      <body>
        <IntroSplash />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener"
          className="wa-float"
          aria-label="Chat on WhatsApp"
        >
          <IconWhatsApp />
        </a>
      </body>
    </html>
  );
}
