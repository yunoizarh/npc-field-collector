import { Menu, X, ArrowRight, BookOpen } from "lucide-react"; // Using Lucide for icons
import bgImage from "../assets/npc-banner-1.jpg";
import { Link } from "react-router-dom";
import Navbar from "./NavBar";
import npcLogo2 from "../assets/npc-logo2.webp";
const HeroSection = () => {
  return (
    <header
      className="relative w-full h-screen  bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <img src={npcLogo2} alt="" />
      <section className="flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-900 opacity-55"></div>

        <div>
          <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight mb-6">
              Census Data Collection,{" "}
              <span className="text-green-400">Anywhere, Anytime</span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-10 font-light max-w-3xl mx-auto">
              Collect and sync reliable population data even in low-connectivity
              areas, empowering accurate planning.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/dashboard"
                className="group inline-flex items-center justify-center px-8 py-3 text-lg font-semibold rounded-xl text-white bg-green-600 shadow-lg shadow-green-600/50 hover:bg-green-700 transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold rounded-xl text-white border-2 border-white hover:bg-white/10 transition duration-300 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Start Data Collection
              </a>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default HeroSection;
