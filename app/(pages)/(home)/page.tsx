import HeroSection from "@/app/(pages)/(home)/components/HeroSection";
import ForVendorsSection from "./components/ForVendorsSection";
import ForClientsSection from "./components/ForClientsSection";
import AboutUsSection from "./components/AboutUsSection";
import TeamSection from "./components/TeamSection";

export default function Home() {
  return (
    <>
      <HeroSection />

      <ForClientsSection />

      <ForVendorsSection />

      <AboutUsSection />

      <TeamSection />
    </>
  );
}
