import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Extensions fixed: e20 & e21 = .png | Baaki sab = .jpeg
const slidesData = [
  {
    img: "/e3.jpeg",
    title: "Excellence Awards",
    desc: "Recognizing outstanding achievements and academic brilliance of our students.",
  },
  {
    img: "/e4.jpeg",
    title: "Annual Felicitation",
    desc: "Honoring the hard work and dedication of our top performers.",
  },
  {
    img: "/e6.jpeg",
    title: "Proud Moments",
    desc: "Celebrating success and milestones achieved by the Vidhya Advance family.",
  },
  {
    img: "/e9.jpeg",
    title: "Student Achievements",
    desc: "Awarding excellence and encouraging students to reach greater heights.",
  },
  {
    img: "/e10.jpeg",
    title: "Rewarding Success",
    desc: "Felicitation ceremonies that motivate and inspire our future leaders.",
  },
  {
    img: "/e20.png",
    title: "Media & Outreach",
    desc: "Spreading awareness and sharing our vision through prominent platforms.",
  },
  {
    img: "/e21.png",
    title: "Guidance & Support",
    desc: "Dedicated mentorship to help students choose the right career path.",
  },
  {
    img: "/banner8.jpeg",
    title: "Community Engagement",
    desc: "Building strong relationships and guiding the youth for a better tomorrow.",
  },
];

const MoreWork = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    duration: 35, // 👈 slide transition slow & smooth
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // ⏱️ Auto-play — ab 5 seconds (slow & relaxed)
  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = setInterval(() => emblaApi.scrollNext(), 1500);
    const stopAutoplay = () => clearInterval(autoplay);
    emblaApi.on("pointerDown", stopAutoplay);
    return () => clearInterval(autoplay);
  }, [emblaApi]);

  return (
    <div className="relative w-full px-4 py-10 mx-auto max-w-7xl">
      <h2 className="mb-10 text-3xl font-bold text-center text-gray-800">
        Our Journey
      </h2>

      {/* Carousel + Arrows Wrapper */}
      <div className="relative group">
        {/* ✨ Left Arrow */}
        <button
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous"
          className="absolute z-20 items-center justify-center hidden w-12 h-12 text-gray-700 transition-all duration-300 ease-out -translate-x-2 -translate-y-1/2 border rounded-full shadow-lg opacity-0 left-2 md:-left-5 top-1/2 md:flex bg-white/70 backdrop-blur-md border-white/60 group-hover:opacity-100 group-hover:translate-x-0 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 hover:text-white hover:border-transparent hover:shadow-indigo-400/50 hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
        </button>

        {/* Carousel Viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slidesData.map((slide, index) => (
              <div
                key={index}
                // 👇 Ab sirf 3 cards per view (bade cards), mobile pe 1
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-4"
              >
                <div className="flex flex-col items-center">
                  {/* 👇 Image container bada kiya */}
                  <div className="flex items-center justify-center w-full mb-5 h-80 lg:h-96">
                    <img
                      src={slide.img}
                      alt={slide.title}
                      className="object-contain max-w-full max-h-full drop-shadow-lg"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900">
                      {slide.title}
                    </h3>
                    <p className="max-w-sm mt-2 text-base text-gray-600">
                      {slide.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ✨ Right Arrow */}
        <button
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next"
          className="absolute z-20 items-center justify-center hidden w-12 h-12 text-gray-700 transition-all duration-300 ease-out translate-x-2 -translate-y-1/2 border rounded-full shadow-lg opacity-0 right-2 md:-right-5 top-1/2 md:flex bg-white/70 backdrop-blur-md border-white/60 group-hover:opacity-100 group-hover:translate-x-0 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 hover:text-white hover:border-transparent hover:shadow-indigo-400/50 hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
        </button>
      </div>

      {/* ✨ Dot Indicators */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {slidesData.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              selectedIndex === i
                ? "w-8 bg-gradient-to-r from-indigo-500 to-purple-600"
                : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MoreWork;