import HeroSection from "./components/HeroSection";
import ForVendorsSection from "./components/ForVendorsSection";
import ForClientsSection from "./components/ForClientsSection";
import AboutUsSection from "./components/AboutUsSection";
import TeamSection from "./components/TeamSection";
import OurPartners from "./components/OurPartnersSection";

export default function Home() {
  return (
    <>
      <HeroSection />

      <ForClientsSection />

      <ForVendorsSection />

      <AboutUsSection />

      <OurPartners />

      <TeamSection />
    </>
  );
}
