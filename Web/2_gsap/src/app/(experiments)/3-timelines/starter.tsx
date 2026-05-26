"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import { SplitText, GSDevTools } from "gsap/all";
import gsap from "gsap";

// register the plugin, otherwise it won't work(GSDevTools is optional, it's a tool for debugging and visualizing the timeline, you can remove it if you don't need it)
gsap.registerPlugin(SplitText, GSDevTools);

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      SplitText.create(".title", {
        type: "words, chars",
        wordsClass: "word++", // word1, word2, ...(gsap will automatically increment the number, useful for stagger)
        charsClass: "char", // animation will be applied to each character
        mask: "chars", // this will create a mask for each character, it will hide the overflow of the characters, useful for animation
      });

      const tl = gsap.timeline(); // create a timeline(for sequencing animations)

      GSDevTools.create({
        animation: tl,
      });

      tl.from(".title .word1 .char", {
        y: "100%", //up
        duration: 0.5,
        stagger: 0.07, //delay
        ease: "circ.out",
      });

      tl.from(
        ".title .word2 .char",
        {
          x: "-100%",
          duration: 0.2,
          stagger: 0.07,
          ease: "circ.out",
        },
        "-=0.5s" /* this will make the animation start 0.5 seconds before the previous animation ends, it will create an overlap between the animations, making it more dynamic */,
      );

      tl.from(
        ".tl-dot ",
        {
          opacity: 0,
          repeat: 10,
          duration: 0.01,
          repeatDelay: 0.05,
          yoyo: true, // this will make the animation reverse back to the original state, creating a blinking effect
        },
        "<",
      );

      tl.from(
        ".tl-start",
        {
          height: 0, //shrink the height to 0, it will create a growing effect
        },
        "<" /* this will make the animation start at the same time as the previous animation */,
      );

      tl.from(
        ".tl-main",
        {
          width: 0, //
        },
        "<+0.2" /* this will make the animation start 0.2 seconds after the previous animation starts, it will create a delay between the animations, making it more dynamic */,
      );

      tl.from(
        ".title .word3 .char",
        {
          y: "-100%",
          duration: 0.3,
          stagger: 0.07,
          ease: "circ.out",
        },
        "-=0.5s" /* this will make the animation start 0.5 seconds before the previous animation ends, it will create an overlap between the animations, making it more dynamic */,
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="bg-[#E5E5E5] text-[#2A2A2A] flex h-screen items-center justify-center tracking-tighter"
    >
      <h1 className="title font-bold text-[min(20vh,10vw)] flex flex-col gap-[0.2em] leading-none text-left uppercase">
        <span className="relative block right-[1.5em] text-left">GSAP</span>
        <span className="relative block">
          <span>timeline</span>
          {/* Timeline */}
          <div className="absolute w-full -bottom-[0.04em] h-[0.04em]">
            <div className="tl-main absolute w-full bottom-0 h-[0.04em] bg-orange-500" />
            <div className="tl-start absolute left-0 top-1/2 -translate-y-1/2 h-[0.16em] w-[0.04em] bg-orange-500" />
          </div>
          {/* Dot */}
          <div className="tl-dot absolute -top-[0.08em] -right-[0.16em] h-[0.08em] aspect-square bg-orange-500 opacity-100" />
        </span>
        <span className="relative block left-[1.6em] text-right">basics</span>
      </h1>
    </div>
  );
}
