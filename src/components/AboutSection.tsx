"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagicText } from "./ui/magic-text";
import { StarIcon } from "./ui/FlowerIcon";

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
          scrub: true,
          fastScrollEnd: true,
        }
      });

      const leftStars = gsap.utils.toArray('.star-left-icon') as HTMLElement[];
      const rightStars = gsap.utils.toArray('.star-right-icon') as HTMLElement[];

      // WARMUP GPU LAYERS: Force the browser to pre-allocate layers
      gsap.set([...leftStars, ...rightStars], { force3D: true, z: 0.01 });

      leftStars.forEach((stars) => {
        const startX = -300 - Math.random() * 200;
        const startY = (Math.random() - 0.5) * 200;
        
        gsap.set(stars, { x: startX, y: startY, rotation: -360, opacity: 0 });
        
        tl.to(stars, 
          { x: 0, y: 0, rotation: 0, opacity: 1, ease: "none" }, 
          0
        );
      });

      rightStars.forEach((stars) => {
        const startX = 300 + Math.random() * 200;
        const startY = (Math.random() - 0.5) * 200;
        
        gsap.set(stars, { x: startX, y: startY, rotation: 360, opacity: 0 });
        
        tl.to(stars, 
          { x: 0, y: 0, rotation: 0, opacity: 1, ease: "none" }, 
          0
        );
      });

    }, sectionRef);
    
    return () => {
      ctx.revert();
    };
  }, []);

  const starStyle = { willChange: "transform, opacity" } as React.CSSProperties;

  return (
    <section ref={sectionRef} className="relative z-10 w-full min-h-[120vh] bg-[#F4F4F4] text-black overflow-hidden flex flex-col justify-center py-40">
      
      {/* Background Grid Pattern (Tiny Flowers) */}
      <div className="absolute inset-0 flex justify-between items-center pointer-events-none px-4 md:px-20">
        <div className="grid grid-cols-2 grid-rows-3 gap-12 md:gap-24">
          <StarIcon style={starStyle} className="star-left-icon w-6 h-6 md:w-10 md:h-10 text-[#FF4500] opacity-0" />
          <StarIcon style={starStyle} className="star-left-icon w-6 h-6 md:w-10 md:h-10 text-black opacity-0" />
          <StarIcon style={starStyle} className="star-left-icon w-6 h-6 md:w-10 md:h-10 text-black opacity-0" />
          <StarIcon style={starStyle} className="star-left-icon w-6 h-6 md:w-10 md:h-10 text-[#FF4500] opacity-0" />
          <StarIcon style={starStyle} className="star-left-icon w-6 h-6 md:w-10 md:h-10 text-[#FF4500] opacity-0" />
          <StarIcon style={starStyle} className="star-left-icon w-6 h-6 md:w-10 md:h-10 text-black opacity-0" />
        </div>
        
        <div className="grid grid-cols-2 grid-rows-3 gap-12 md:gap-24">
          <StarIcon style={starStyle} className="star-right-icon w-6 h-6 md:w-10 md:h-10 text-black opacity-0" />
          <StarIcon style={starStyle} className="star-right-icon w-6 h-6 md:w-10 md:h-10 text-[#FF4500] opacity-0" />
          <StarIcon style={starStyle} className="star-right-icon w-6 h-6 md:w-10 md:h-10 text-[#FF4500] opacity-0" />
          <StarIcon style={starStyle} className="star-right-icon w-6 h-6 md:w-10 md:h-10 text-black opacity-0" />
          <StarIcon style={starStyle} className="star-right-icon w-6 h-6 md:w-10 md:h-10 text-black opacity-0" />
          <StarIcon style={starStyle} className="star-right-icon w-6 h-6 md:w-10 md:h-10 text-[#FF4500] opacity-0" />
        </div>
      </div>

      <div className="relative z-10 w-full flex items-center justify-center ">
        <MagicText text="We are a web development team focused on building clean, functional, and user-friendly websites. Our goal is to create digital experiences that not only look good but also perform reliably." />
      </div>

    </section>
  );
}
