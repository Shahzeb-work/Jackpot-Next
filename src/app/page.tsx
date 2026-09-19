import Footer from "@/components/footer";
import HeroBanner from "@/components/hero-banner";
import ProvidersStrip from "@/components/providers-strip";
import QuickBuy from "@/components/quick-buy";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-10 px-4 py-6 md:px-6 md:py-8">
        <HeroBanner />
        <QuickBuy />
        <ProvidersStrip />
      </div>
      <Footer />
    </div>
  );
}
