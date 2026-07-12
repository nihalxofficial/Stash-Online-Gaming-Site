import AboutSection from "@/components/HomePage/AboutSection";
import CommunityCTA from "@/components/HomePage/CommunityCTA";
import HeroBanner from "@/components/HomePage/HeroBanner";
import LatestGames from "@/components/HomePage/LatestGames";
import MatchCountdown from "@/components/HomePage/MatchCountdown";
import SpecialFeatures from "@/components/HomePage/SpecialFeatures";

export default function Home() {
  return (
    <>
      <HeroBanner/>
      <AboutSection/>
      <LatestGames/>
      <MatchCountdown/>
      <SpecialFeatures/>
      <CommunityCTA/>
    </>
  );
}
