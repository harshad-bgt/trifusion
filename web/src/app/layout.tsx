import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContactWidget } from "@/components/ui/FloatingContactWidget";
import { ProjectDrawer } from "@/components/ui/ProjectDrawer";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.seo.defaultTitle,
        template: siteConfig.seo.titleTemplate,
    },
    description: siteConfig.seo.defaultDescription,
    keywords: ["software development", "GST accounting", "mobile apps", "AI", "custom software", "TriFusion Tech LLP", "digital products"],
    authors: [{ name: "TriFusion Tech LLP" }],
    creator: "TriFusion Tech LLP",
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: siteConfig.url,
        title: siteConfig.seo.defaultTitle,
        description: siteConfig.seo.defaultDescription,
        siteName: siteConfig.name,
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.seo.defaultTitle,
        description: siteConfig.seo.defaultDescription,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

import { PublicOnly, MainWrapper } from "@/components/layout/PublicOnly";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className="min-h-screen flex flex-col">
                <PublicOnly>
                    <Navbar />
                </PublicOnly>
                
                <MainWrapper>
                    {children}
                </MainWrapper>
                
                <PublicOnly>
                    <Footer />
                    <FloatingContactWidget />
                    <ProjectDrawer />
                </PublicOnly>
            </body>
        </html>
    );
}

