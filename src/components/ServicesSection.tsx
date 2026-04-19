"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FlowerIcon } from "./ui/FlowerIcon";

const STEPS = [
  {
    num: "01",
    title: "Subscribe",
    desc: "Pick a plan that fits your workload and pay monthly, with no contracts and no minimum commitment. Pause or cancel to the next month whenever you need to.",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000",
  },
  {
    num: "02",
    title: "Request",
    desc: "Send your work through Slack, email, or wherever your team already communicates. We tackle one request at a time in the order you set.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000",
  },
  {
    num: "03",
    title: "Ship",
    desc: "You'll receive deliverables every 2-5 business days with unlimited revisions until you're happy.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000",
  },
  {
    num: "04",
    title: "Repeat",
    desc: "Submit your next request and we keep going the same way. Your backlog shrinks and your product gets better, month after month.",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000",
  }
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const stepElements = gsap.utils.toArray('.step-item') as HTMLElement[];
      const imgElements = gsap.utils.toArray('.step-img') as HTMLElement[];

      function activateStep(step: HTMLElement, imgs: HTMLElement[], index: number) {
        gsap.to(step, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
        gsap.to(step.querySelector('.step-icon'), { opacity: 1, scale: 1, rotation: 180, duration: 0.8, ease: "back.out(1.5)" });
        
        gsap.to(imgs, { opacity: 0, duration: 0.8, ease: "power2.inOut" });
        gsap.to(imgs[index], { opacity: 1, duration: 0.8, ease: "power2.inOut" });
      }

      function deactivateStep(step: HTMLElement) {
        gsap.to(step, { opacity: 0.3, y: 10, duration: 0.8, ease: "power2.inOut" });
        gsap.to(step.querySelector('.step-icon'), { opacity: 0, scale: 0.5, rotation: 0, duration: 0.8, ease: "power2.inOut" });
      }

      // Set initial state
      gsap.set(stepElements, { y: 10 });

      let activeIndex = -1;

      ScrollTrigger.create({
        trigger: ".step-list-wrapper",
        start: "top 60%",
        end: "bottom 40%",
        onUpdate: (self) => {
          const centerY = window.innerHeight / 2;
          let closestIdx = 0;
          let minDistance = Infinity;

          stepElements.forEach((step, i) => {
            const rect = step.getBoundingClientRect();
            const stepMid = rect.top + rect.height / 2;
            const dist = Math.abs(stepMid - centerY);
            if (dist < minDistance) {
              minDistance = dist;
              closestIdx = i;
            }
          });

          if (closestIdx !== activeIndex) {
            if (activeIndex !== -1) deactivateStep(stepElements[activeIndex]);
            activateStep(stepElements[closestIdx], imgElements, closestIdx);
            activeIndex = closestIdx;
          }
        },
        onLeave: () => {
          if (activeIndex !== -1) deactivateStep(stepElements[activeIndex]);
          activeIndex = -1;
        },
        onLeaveBack: () => {
          if (activeIndex !== -1) deactivateStep(stepElements[activeIndex]);
          activeIndex = -1;
        }
      });
    }, containerRef);

    return () => {
      ctx.revert(); // Proper cleanup for React Strict Mode
    };
  }, []);

  return (
    <section ref={containerRef} className="relative z-10 w-full bg-[#F4F4F4] text-black">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-24 flex flex-col md:flex-row gap-10 md:gap-20 items-start">
        
        {/* Left Column (Scrollable Text) */}
        <div className="w-full md:w-1/2 flex flex-col step-list-wrapper">
          <div className="mb-20 md:mb-32 flex justify-between items-center w-full">
            <h2 className="text-4xl md:text-6xl font-sans tracking-tight font-medium">How it works</h2>
            <span className="text-[#FF4500] font-sans font-medium text-sm tracking-widest uppercase">// Process</span>
          </div>

          <div className="flex flex-col gap-8 md:gap-12 pb-[50vh] pt-[30vh]">
            {STEPS.map((step, i) => (
              <div key={i} className="step-item relative opacity-30 flex gap-6 md:gap-8 transition-opacity">
                <FlowerIcon className={`step-icon absolute -left-10 md:-left-15 top-0 w-8 h-8 md:w-10 md:h-10 ${i % 2 === 0 ? 'text-[#FF4500]' : 'text-black'} opacity-0 scale-50`} />
                <span className="text-zinc-500 font-mono text-lg md:text-xl font-medium mt-1">{step.num}</span>
                <div className="flex flex-col gap-4">
                  <h3 className="text-3xl md:text-5xl font-sans font-medium text-zinc-900">{step.title}</h3>
                  <p className="text-zinc-500 font-sans text-base md:text-lg leading-relaxed max-w-sm">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Sticky Image) */}
        <div className="hidden md:block w-full md:w-1/2 sticky top-[20vh]">
          <div className="w-full aspect-4/5 relative overflow-hidden bg-zinc-200">
            {STEPS.map((step, i) => (
              <img
                key={i}
                src={step.img}
                alt={step.title}
                className="step-img absolute inset-0 w-full h-full object-cover opacity-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
