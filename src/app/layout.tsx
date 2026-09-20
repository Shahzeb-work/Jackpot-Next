import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import SupportButton from "@/components/support-button";
import IntercomWidget from "@/components/intercom-widget";
import AuthModal from "@/components/auth-modal";
import RewardsModal from "@/components/rewards-modal";
import PackagesModal from "@/components/packages-modal";
import PackagesListModal from "@/components/packages-list-modal";
import SpinWheelModal from "@/components/spin-wheel-modal";
import { AppStateProvider } from "@/components/providers/app-state";
import { getCurrentUser } from "@/lib/auth/current-user";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const marquee = Bebas_Neue({
  variable: "--font-marquee",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Jackpotrush.io — Play, Earn, Redeem",
  description: "Sweeps coin rewards dashboard: VIP tiers, quick buy packages and daily promotions.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${marquee.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-sans">
        <AppStateProvider initialUser={user}>
          <Header />
          <div className="flex flex-1 w-full">
            <Sidebar />
            <main className="flex-1 min-w-0">{children}</main>
          </div>
          <SupportButton />
          <AuthModal />
          <RewardsModal />
          <PackagesModal />
          <PackagesListModal />
          <SpinWheelModal />
          <IntercomWidget />
        </AppStateProvider>
      </body>
    </html>
  );
}
