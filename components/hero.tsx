"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import Button from "./ui/button";
import { NavigationIcon } from "lucide-react";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVideoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex((prev) => (prev % totalVideos) + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            if (nextVideoRef.current) {
              nextVideoRef.current.play().catch((error) => {
                console.error("Error playing video:", error);
              });
            } else {
              console.warn("Video ref is null.");
            }
          },
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    },
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoPath = (index: number) => `videos/hero-${index}.mp4`;

  return (
    <section className="relative h-dvh w-screen overflow-x-hidden">
      <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              onClick={handleMiniVideoClick}
            >
              <video
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center "
                ref={nextVideoRef}
                src={getVideoPath(currentIndex + 1)}
                loop
                muted
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>
          <video
            className="absolute-center invisible absolute z-20 size-64 object-center object-cover"
            ref={nextVideoRef}
            src={getVideoPath(currentIndex)}
            onLoadedData={handleVideoLoad}
            loop
            muted
            id="next-video"
          />
          <video
            className="absolute left-0 top-0 size-full object-cover object-center"
            src={getVideoPath(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            onLoadedData={handleVideoLoad}
            autoPlay
            loop
            muted
            id="next-video"
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h2 className="special-font hero-heading text-blue-100 ">
              redefi<b>n</b>e
            </h2>
            <p className="mb-5 max-w-60 font-robert-regular text-blue-100">
              Enter the Metagame Layer Unleash the Play Economy
            </p>
            <Button
              className="bg-yellow-300"
              leftIcon={<NavigationIcon className="fill-black" size={14} />}
              id="watch-trailer"
            >
              Watch Trailer
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
