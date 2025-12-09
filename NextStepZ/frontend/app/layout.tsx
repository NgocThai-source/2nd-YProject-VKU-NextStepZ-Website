import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/header";
import { HeaderSpacer } from "@/components/layout/header-spacer";
import Footer from "@/components/layout/footer";
import { AuthProvider } from "@/lib/auth-context";
import { ProfileProvider } from "@/lib/profile-context";
import { SavedPortfolioProvider } from "@/lib/saved-portfolio-context";
import { SavedItemsProvider } from "@/lib/saved-items-context";
import { MessagingProvider } from "@/lib/messaging-context";
import { ToastProvider } from "@/components/ui/toast";
import { iCielCadena, iCielCroncante, iCielShowcase } from "./fonts";
import "./globals.css";
import "./about.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextStepZ - Your first step to the future.",
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${iCielCadena.variable} ${iCielCroncante.variable} ${iCielShowcase.variable} antialiased`}
      >
        <AuthProvider>
          <SavedItemsProvider>
            <MessagingProvider>
              <ProfileProvider>
                <SavedPortfolioProvider>
                  <ToastProvider>
                    <Header />
                    <HeaderSpacer />
                    <main>
                      {children}
                    </main>
                    <Footer />
                  </ToastProvider>
                </SavedPortfolioProvider>
              </ProfileProvider>
            </MessagingProvider>
          </SavedItemsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
