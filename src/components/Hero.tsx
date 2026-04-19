"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Logo from "./Logo";

const IMAGES = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2000",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    // Create a continuous sweep effect timeline for the images
    const tl = gsap.timeline({ repeat: -1 });

    // Initial state setup
    imagesRef.current.forEach((img, i) => {
      if (!img) return;
      gsap.set(img, { 
        clipPath: i === 0 ? "inset(0 0 0 0%)" : "inset(0 0 0 100%)",
        zIndex: i + 1
      });
    });

    let currentZ = IMAGES.length + 1;

    IMAGES.forEach((_, i) => {
      const nextIndex = (i + 1) % IMAGES.length;
      const nextImg = imagesRef.current[nextIndex];

      if (nextImg) {
        tl.set(nextImg, { zIndex: currentZ++, clipPath: "inset(0 0 0 100%)" }, "+=2");
        tl.to(nextImg, {
          clipPath: "inset(0 0 0 0%)",
          duration: 1.5,
          ease: "power2.inOut",
        });
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between"
      style={{ zIndex: 1 }}
    >
      {/* Background Images Layer */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full bg-black">
          {IMAGES.map((src, i) => (
            <img
              key={i}
              ref={(el) => {
                imagesRef.current[i] = el;
              }}
              src={src}
              alt={`Background ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover brightness-50"
            />
          ))}
        </div>
      </div>

      {/* Spacer for removed header */}
      <div className="relative z-10 w-full h-24 md:h-32 pointer-events-none shrink-0" />

      {/* Middle Grid Lines / Categories */}
      <div className="relative z-10 w-full p-6 md:p-10 flex justify-between text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 font-sans mix-blend-difference">
        <span>Web Applications</span>
        <span>Digital Experiences</span>
        <span>Frontend Architecture</span>
      </div>

      {/* Big Text */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center pb-20 md:pb-32 px-4 mix-blend-difference pointer-events-none">
        <h1 className="font-oswald text-[18vw] md:text-[12vw] leading-[0.85] tracking-tight text-white text-center flex flex-col items-center w-full uppercase">
          <span>Website</span>
          <span>Development</span>
          <span>Agency</span>
        </h1>
      </div>

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px)`,
          backgroundSize: '10vw 100%'
        }}
      />
    </section>
  );
}
