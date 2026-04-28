import React from "react";
import { Link } from "react-router";

const JoinSection = () => {
  return (
    <section className="relative bg-[var(--card)] py-16 mb-10 px-10 text-[var(--foreground)] overflow-hidden mx-3 rounded-xl border border-[var(--border)]">
      <div className="absolute inset-0 z-0">
        <img
          src={`${import.meta.env.BASE_URL}image.jpg`}
          alt="Background"
          className="w-full h-full object-cover opacity-10 relative z-0"
        />
        <div className="absolute inset-0 "></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
        <div className="md:w-3/5">
          <h4 className="text-5xl font-bold mb-5 leading-tight text-[var(--primary)]">
            Join Today
          </h4>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Get access to maintain your own{" "}
            <span className="italic text-[var(--primary)]">
              custom personal lists
            </span>
            , track what you've seen and search and filter for{" "}
            <span className="italic text-[var(--primary)]">
              what to watch next
            </span>
            .
          </p>
          <Link 
            to="/register"
            className="bg-[var(--primary)] text-[var(--primary-foreground)] px-10 py-3 rounded-md font-bold hover:brightness-110 transition-all duration-300 shadow-lg cursor-pointer inline-block"
          >
            Sign Up
          </Link>
        </div>

        <div className="md:w-2/5 text-sm opacity-80 space-y-4">
          <ul className="list-disc list-outside pl-5 space-y-2.5 text-[var(--muted-foreground)]">
            <li>Maintain a personal watchlist</li>
            <li>Filter by your subscribed streaming services</li>
            <li>Log the movies and TV shows you've seen</li>
            <li>Build custom lists</li>
            <li>Contribute to and improve our database</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
