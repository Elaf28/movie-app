import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#031d33]  text-white py-12 px-10 relative overflow-hidden ">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#90cea1] via-[#01b4e4] to-[#90cea1]"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#90cea1] to-[#01b4e4]">
            T&M
          </h2>
          <Link 
            to="/join" 
            className="bg-[#01b4e4] text-[#032541] font-bold py-2 px-6 rounded-lg hover:bg-white transition-all text-center w-fit shadow-lg shadow-cyan-500/20"
          >
            JOIN THE COMMUNITY
          </Link>
        </div>

        <div>
          <h3 className="text-xl font-bold uppercase mb-5 tracking-wider text-[#90cea1]">The Basics</h3>
          <ul className="space-y-3 opacity-80 font-medium">
            <li><a href="#" className="hover:text-[#01b4e4] transition">About T&M</a></li>
            <li><a href="#" className="hover:text-[#01b4e4] transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-[#01b4e4] transition">Support Forums</a></li>
            <li><a href="#" className="hover:text-[#01b4e4] transition">System Status</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold uppercase mb-5 tracking-wider text-[#90cea1]">Community</h3>
          <ul className="space-y-3 opacity-80 font-medium">
            <li><a href="#" className="hover:text-[#01b4e4] transition">Guidelines</a></li>
            <li><a href="#" className="hover:text-[#01b4e4] transition">Discussions</a></li>
            <li><a href="#" className="hover:text-[#01b4e4] transition">Leaderboard</a></li>
            <li><a href="#" className="hover:text-[#01b4e4] transition">Twitter</a></li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-bold uppercase tracking-wider text-[#90cea1]">Follow Us</h3>
          <div className="flex gap-5 text-2xl">
            <FaFacebook className="hover:text-[#01b4e4] cursor-pointer transition transform hover:-translate-y-1" />
            <FaTwitter className="hover:text-[#01b4e4] cursor-pointer transition transform hover:-translate-y-1" />
            <FaInstagram className="hover:text-[#01b4e4] cursor-pointer transition transform hover:-translate-y-1" />
            <FaLinkedin className="hover:text-[#01b4e4] cursor-pointer transition transform hover:-translate-y-1" />
          </div>
          <div className="mt-4">
             <p className="text-xs opacity-50 uppercase font-bold">Legal</p>
             <p className="text-sm opacity-70">Terms of Use | Privacy Policy</p>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-white/10 text-center opacity-40 text-sm italic">
        <p>© 2026 T&M Movie Database. Crafted with ❤️ for ITI React Project.</p>
      </div>
    </footer>
  );
};

export default Footer;