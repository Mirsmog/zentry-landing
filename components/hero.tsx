"use client";
import React, { useState } from "react";

interface IHero {}

const Hero: React.FC<IHero> = ({}) => {
  return (
    <section className="relative h-dvh w-screen overflow-x-hidden">
      <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div>plyaers</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
