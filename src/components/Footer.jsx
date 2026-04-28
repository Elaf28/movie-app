import React from "react";
import { Link } from "react-router";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground border-t border-border ">
      
      <div className="mx-auto px-5 md:px-15 lg:px-30 py-12 flex justify-between gap-8 flex-col md:flex-row">
        <div className="flex flex-col gap-4">
          <h2 style={{ fontFamily: '"Creepster", cursive' }} className="text-3xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
            CineVerse
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Discover movies, explore trending content, and build your personal
            watchlist — all in one place.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/Home" className="hover:text-primary transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/movie/discover" className="hover:text-primary transition">
                Discover
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="hover:text-primary transition">
                Favorites
              </Link>
            </li>
            <li>
              <Link to="/watchlist" className="hover:text-primary transition">
                Watchlist
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Follow</h3>
          <div className="flex gap-4 text-xl text-muted-foreground">
            <a href="https://www.facebook.com/" target="_blank" className="hover:text-primary transition">
              <FaFacebook />
            </a>
            <a href="https://twitter.com/" target="_blank" className="hover:text-primary transition">
              <FaXTwitter />
            </a>
            <a href="https://www.instagram.com/" target="_blank" className="hover:text-primary transition">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" className="hover:text-primary transition">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} CineVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;