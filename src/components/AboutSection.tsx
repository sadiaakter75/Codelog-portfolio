"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagicText } from "./ui/magic-text";
import { FlowerIcon } from "./ui/FlowerIcon";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 10%",
          scrub: 2.5,
        }
      });

      const leftFlowers = gsap.utils.toArray('.flower-left-icon') as HTMLElement[];
      const rightFlowers = gsap.utils.toArray('.flower-right-icon') as HTMLElement[];

      leftFlowers.forEach((flower) => {
        tl.fromTo(flower, 
          { x: -300 - Math.random() * 200, y: (Math.random() - 0.5) * 200, rotation: -360, opacity: 0 }, 
          { x: 0, y: 0, rotation: 0, opacity: 1, ease: "none" }, 
          0
        );
      });

      rightFlowers.forEach((flower) => {
        tl.fromTo(flower, 
          { x: 300 + Math.random() * 200, y: (Math.random() - 0.5) * 200, rotation: 360, opacity: 0 }, 
          { x: 0, y: 0, rotation: 0, opacity: 1, ease: "none" }, 
          0
        );
      });

    }, sectionRef);
    
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 w-full min-h-[120vh] bg-[#F4F4F4] text-black overflow-hidden flex flex-col justify-center py-40">
      
      {/* Background Grid Pattern (Tiny Flowers) */}
      <div className="absolute inset-0 flex justify-between items-center pointer-events-none px-4 md:px-20">
        <div className="grid grid-cols-2 grid-rows-3 gap-12 md:gap-24">
          <FlowerIcon className="flower-left-icon w-6 h-6 md:w-10 md:h-10 text-[#FF4500] opacity-0" />
          <FlowerIcon className="flower-left-icon w-6 h-6 md:w-10 md:h-10 text-black opacity-0" />
          <FlowerIcon className="flower-left-icon w-6 h-6 md:w-10 md:h-10 text-black opacity-0" />
          <FlowerIcon className="flower-left-icon w-6 h-6 md:w-10 md:h-10 text-[#FF4500] opacity-0" />
          <FlowerIcon className="flower-left-icon w-6 h-6 md:w-10 md:h-10 text-[#FF4500] opacity-0" />
          <FlowerIcon className="flower-left-icon w-6 h-6 md:w-10 md:h-10 text-black opacity-0" />
        </div>
        
        <div className="grid grid-cols-2 grid-rows-3 gap-12 md:gap-24">
          <FlowerIcon className="flower-right-icon w-6 h-6 md:w-10 md:h-10 text-black opacity-0" />
          <FlowerIcon className="flower-right-icon w-6 h-6 md:w-10 md:h-10 text-[#FF4500] opacity-0" />
          <FlowerIcon className="flower-right-icon w-6 h-6 md:w-10 md:h-10 text-[#FF4500] opacity-0" />
          <FlowerIcon className="flower-right-icon w-6 h-6 md:w-10 md:h-10 text-black opacity-0" />
          <FlowerIcon className="flower-right-icon w-6 h-6 md:w-10 md:h-10 text-black opacity-0" />
          <FlowerIcon className="flower-right-icon w-6 h-6 md:w-10 md:h-10 text-[#FF4500] opacity-0" />
        </div>
      </div>

      <div className="relative z-10 w-full flex items-center justify-center">
        <MagicText text="ICOMAT invented RTS. Rapid Tow Shearing." />
      </div>

    </section>
  );
}
