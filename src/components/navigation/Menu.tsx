"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Logo from "../Logo";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Menu({ isOpen, onClose }: MenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Make the wrapper clickable
      gsap.set(overlayRef.current, { pointerEvents: "auto" });

      const tl = gsap.timeline();
      
      // Panels sliding in vertically from top (left panel) and bottom (right panel)
      tl.to([".panel-left", ".panel-right"], {
        y: "0%",
        duration: 1.2,
        ease: "expo.inOut",
      });

      // Content fade in
      tl.to(".menu-content", {
        opacity: 1,
        duration: 0.4,
      }, "-=0.6");

      // Header, Footer and Links staggering in together
      tl.fromTo(
        ".menu-fade-in",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power3.out" },
        "-=0.8"
      );

      tl.fromTo(
        ".menu-item",
        { y: 60, opacity: 0, rotateX: 10 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.7"
      );
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlayRef.current, { pointerEvents: "none" });
        }
      });

      tl.to(".menu-fade-in, .menu-item", {
        y: -20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.02,
        ease: "power2.inOut"
      });

      tl.to(".menu-content", {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut"
      }, "-=0.3");

      tl.to(".panel-left", {
        y: "-100%",
        duration: 1.0,
        ease: "expo.inOut",
      }, "-=0.2");
      
      tl.to(".panel-right", {
        y: "100%",
        duration: 1.0,
        ease: "expo.inOut",
      }, "-=1.0");
    }
  }, [isOpen]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-100 pointer-events-none">
      {/* Background Panels */}
      <div className="absolute inset-0 flex w-full h-full overflow-hidden">
        <div className="panel-left w-1/2 h-full bg-white -translate-y-full" />
        <div className="panel-right w-1/2 h-full bg-white translate-y-full" />
      </div>

      {/* Content */}
      <div className="menu-content absolute inset-0 flex flex-col justify-between p-6 md:p-10 opacity-0 text-black overflow-hidden perspective-1000">
        <div className="flex justify-between items-start w-full menu-fade-in">
          <Logo className="w-44 md:w-42 h-auto" />
          <button 
            onClick={onClose}
            className="text-sm font-sans uppercase font-medium bg-black text-white px-4 py-1 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

        <nav className="flex flex-col gap-4 md:gap-8 font-oswald text-5xl md:text-8xl uppercase font-bold tracking-tight">
          <div className="overflow-hidden">
            <a href="#projects" onClick={onClose} className="menu-item block hover:text-zinc-500 transition-colors w-fit origin-left">Projects</a>
          </div>
          <div className="overflow-hidden">
            <a href="#about" onClick={onClose} className="menu-item block hover:text-zinc-500 transition-colors w-fit origin-left">About</a>
          </div>
          <div className="overflow-hidden">
            <a href="#services" onClick={onClose} className="menu-item block hover:text-zinc-500 transition-colors w-fit origin-left">Services</a>
          </div>
          <div className="overflow-hidden">
            <a href="#contact" onClick={onClose} className="menu-item block hover:text-zinc-500 transition-colors w-fit origin-left">Contact</a>
          </div>
        </nav>

        <div className="flex justify-between text-xs md:text-sm font-sans uppercase tracking-widest text-zinc-500 w-full menu-fade-in">
          <span>Follow Us</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-black transition-colors">Instagram</a>
            <a href="#" className="hover:text-black transition-colors">Twitter</a>
            <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
}
