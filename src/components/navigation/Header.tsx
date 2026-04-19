"use client";

import { useState } from "react";
import Logo from "../Logo";
import Menu from "./Menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Header Layer 1: Logo (Original Colors) */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-start z-70 pointer-events-none">
        <div className="flex pointer-events-auto -mt-1 md:-mt-8">
          <Logo className="w-32 md:w-44 h-auto" />
        </div>
      </header>

      {/* Header Layer 2: Navigation & Menu (Inverted/Dynamic Colors) */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-start mix-blend-difference text-white z-60 pointer-events-none">
        {/* Invisible Spacer to match Logo width for perfect alignment */}
        <div className="w-32 md:w-44 h-1 opacity-0 pointer-events-none -mt-1 md:-mt-8" />

        <div className="hidden md:flex gap-10 lg:gap-32 pointer-events-auto text-left font-sans text-[11px] md:text-xs font-semibold leading-[1.3] text-white">
          <div className="w-[220px]">
            <p> &nbsp; &nbsp; &nbsp;Cutting-edge web development.</p>
            <p>Driven by performance. Built with</p>
            <p>modern technologies.</p>
          </div>
          <div className="w-[180px]">
            <p>hello@agency.com</p>
            <p>Modena, EST 2008©</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm font-sans uppercase font-medium pointer-events-auto">
          <span>IT</span>
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="bg-white text-black px-4 py-1 hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Menu
          </button>
        </div>
      </header>
    </>
  );
}
