import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { assetPath, siteConfig, siteDescription, siteRootUrl } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteRootUrl() + "/"),
  title: {
    default: siteConfig.name + " — Web Developer",
    template: "%s | " + siteConfig.name,
  },
  description: siteDescription,
  applicationName: siteConfig.name + " Portfolio",
  alternates: {
    canonical: siteRootUrl() + "/",
  },
  openGraph: {
    type: "website",
    url: siteRootUrl() + "/",
    siteName: siteConfig.name,
    title: siteConfig.name + " — Web Developer",
    description: siteDescription,
    images: [siteRootUrl() + "/opengraph-image.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name + " — Web Developer",
    description: siteDescription,
    images: [siteRootUrl() + "/opengraph-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: assetPath("/icon.svg"),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
