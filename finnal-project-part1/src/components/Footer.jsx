import React from "react";
import Logo from "../Shared/Logo";
import { FacebookIcon, LinkedinIcon, Youtube } from "lucide-react";

const Footer = () => {
  return (
   <footer className="bg-black text-gray-300 py-16 px-6 md:px-12 mt-10 rounded-3xl shadow-2xl">
  <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

    {/* Logo + Description */}
    <div className="md:col-span-2">
      <div className="flex items-center gap-3 mb-5 text-white">
        <Logo />
      </div>
      <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-md">
        Fast, secure and reliable parcel delivery service with real-time updates. 
        We ensure on-time delivery for personal and business shipments across the country.
      </p>

      {/* Social Icons */}
      <div className="flex gap-4 mt-6">
        <a
          href="#"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0A66C2] hover:bg-[#0a66c2d8] transition duration-300"
        >
          <LinkedinIcon className="w-5 h-5 text-white" />
        </a>

        <a
          href="#"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-white hover:bg-white hover:text-black transition duration-300"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>

        <a
          href="#"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 transition duration-300"
        >
          <FacebookIcon className="w-5 h-5 text-white" />
        </a>

        <a
          href="#"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-500 transition duration-300"
        >
          <Youtube className="w-5 h-5 text-white" />
        </a>
      </div>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
      <ul className="space-y-3 text-sm">
        <li><a href="#services" className="hover:text-lime-300 transition">Services</a></li>
        <li><a href="#coverage" className="hover:text-lime-300 transition">Coverage Area</a></li>
        <li><a href="#pricing" className="hover:text-lime-300 transition">Pricing</a></li>
        <li><a href="#blog" className="hover:text-lime-300 transition">Blog</a></li>
        <li><a href="#contact" className="hover:text-lime-300 transition">Contact</a></li>
      </ul>
    </div>

    {/* Company Info */}
    <div>
      <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
      <ul className="space-y-3 text-sm">
        <li><a href="#about" className="hover:text-lime-300 transition">About Us</a></li>
        <li><a href="#mission" className="hover:text-lime-300 transition">Our Mission</a></li>
        <li><a href="#privacy" className="hover:text-lime-300 transition">Privacy Policy</a></li>
        <li><a href="#terms" className="hover:text-lime-300 transition">Terms & Conditions</a></li>
      </ul>
    </div>

  </div>

  {/* Bottom Section */}
  <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
    © {new Date().getFullYear()} ParcelPro — All Rights Reserved.
  </div>
</footer>

  );
};

export default Footer;
