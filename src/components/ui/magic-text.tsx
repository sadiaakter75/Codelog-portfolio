"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface MagicTextProps {
  text: string;
}

export const MagicText: React.FC<MagicTextProps> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray('.word-span') as HTMLElement[];
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "top 25%",
          scrub: true,
        }
      });

      words.forEach((word, i) => {
        const reveal = word.querySelector('.word-reveal');
        if (reveal) {
          tl.to(reveal, {
            opacity: 1,
            ease: "none"
          }, i / words.length);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [text]);

  const words = text.split(" ");

  return (
    <div 
      ref={containerRef} 
      className="relative flex flex-wrap justify-center text-center max-w-4xl mx-auto leading-none p-4 text-black"
    >
      {words.map((word, i) => (
        <span key={i} className="word-span relative mt-[12px] mr-2 text-4xl md:text-7xl font-bold tracking-tight">
          <span className="absolute opacity-10">{word}</span>
          <span className="word-reveal opacity-0">{word}</span>
        </span>
      ))}
    </div>
  );
};
