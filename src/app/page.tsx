import Footer from "@/components/footer";
import HeroBanner from "@/components/hero-banner";
import QuickBuy from "@/components/quick-buy";
import HowToPlay from "@/components/home/how-to-play";
import EarnRewards from "@/components/home/earn-rewards";
import FeaturesGrid from "@/components/home/features-grid";
import Testimonials from "@/components/home/testimonials";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-14 px-4 py-6 md:px-6 md:py-8">
        <HeroBanner />
        <QuickBuy />
        <HowToPlay />
        <EarnRewards />
        <FeaturesGrid />
        <Testimonials />
      </div>
      <Footer />
    </div>
  );
}
