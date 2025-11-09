import Navbar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import DemoSection from "../components/DemoSection";
import FooterSection from "../components/Footer";

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
