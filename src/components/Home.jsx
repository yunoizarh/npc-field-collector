import Navbar from "./NavBar";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import DemoSection from "./DemoSection";
import FooterSection from "./Footer";

const Home = () => {
  return (
    <div className="min-h-screen font-sans antialiased">
      {/* <Navbar /> */}

      <HeroSection />

      <main className="bg-white min-h-screen">
        <FeaturesSection />
        <DemoSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default Home;
