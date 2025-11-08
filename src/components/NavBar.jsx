import { useState } from "react";
import { Menu, X } from "lucide-react"; // Using Lucide for icons

// --- Navbar Component ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "SignIn", href: "/signin" },
    { name: "About", href: "#" },
  ];

  return (
    <nav className="fixed w-full z-50 shadow-md bg-gray-200">
      <div className="max-w-7xl  px-4 sm:px-6 lg:px-8  sm:mx-[5%]">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#"
              className="text-2xl font-extrabold text-green-200 tracking-wider"
            >
              NPC <span className="text-gray-900 font-semibold">Data</span>
              {/* <img
                src="https://nigerianobservernews.com/wp-content/uploads/2024/12/NPC-logo-1.webp"
                alt=""
              /> */}
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:ml-6 md:flex md:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="inline-flex items-center px-1 pt-1 text-base font-medium text-gray-700 hover:text-green-600 transition duration-150"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 transition duration-150"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
