"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText); // register the plugin, this is required for all GSAP plugins, it tells GSAP that we want to use this plugin in our project

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null); // ref to the container

  // This is the boiler-plate code for GSAP
  // useEffect(() => {
  //   // tween => Tween is what does all the animation work
  //   // const tween = gsap.from(".title", {
  //   //   duration: 10,
  //   //   x: 200, // start 200px to the right
  //   //   // opacity: 0, // start with opacity 0
  //   //   // onUpdate: () => {
  //   //   //   console.log("updating");
  //   //   // },
  //   // });

  //   // context => Context is what manages the lifecycle of the animation
  //   const ctx = gsap.context(() => {
  //     // context => Context is what manages the lifecycle of the animation
  //     gsap.to(".title", {
  //       x: 200,
  //       duration: 10,
  //     });

  //     gsap.from(".title", {
  //       opacity: 200,
  //       duration: 10,
  //     });
  //   }, containerRef);

  //   return () => {
  //     //tween.revert();
  //     ctx.revert(); // clean up the animation
  //   };
  // }, []);

  //Gsap created a hook

  // useGSAP is a hook that manages the lifecycle of the animation, it automatically cleans up the animation when the component unmounts(replace useEffect and context)
  useGSAP(
    () => {
      SplitText.create(".title", {
        type: "chars, words", // this is the type of split we want, we can split by chars, words or lines, we can also combine them
        charsClass: "letter", // this is the class that will be added to each character, we can use this class to animate each character separately
      }); // this will split the text into characters and words, and add the class "letter" to each character
      gsap.from(".title .letter", {
        y: 200,
        //duration: 10,
        opacity: 0,
        ease: "circ.out",
        stagger: 0.03, // stagger is the delay between each animation, it creates a nice effect when animating multiple elements
      });
    },
    { scope: containerRef }, // scope is the same as context, it manages the lifecycle of the animation
  );
  return (
    <div className="bg-blue-300 text-black">
      <p className="title">Check the console for updates</p>
      <div
        ref={containerRef}
        className="flex h-screen items-end justify-left overflow-hidden"
      >
        <h1 className="title font-black text-[min(20rem,30vw)] leading-none pb-[0.1em] text-left">
          GSAP
          <br />
          tweens
        </h1>
      </div>
    </div>
  );
}
