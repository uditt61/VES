import React from "react";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const banners = [
  { id: 1, src: "/banner3.jpeg", title: "शिक्षा और सहायता" },
  { id: 2, src: "/banner11.jpeg", title: "बैग वितरण कार्यक्रम" },
  { id: 3, src: "/banner13.jpeg", title: "सामाजिक कल्याण" },
  { id: 4, src: "/banner14.jpeg", title: "युवा शक्ति" },
  { id: 5, src: "/e21.png", title: "समाज सेवा और शिक्षा" },
];

const Workings = () => (
  <div className="w-full py-16 font-sans bg-gradient-to-b from-slate-50 via-white to-slate-50">
    <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">

      {/* HEADING */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-3xl font-medium tracking-tight text-gray-500 sm:text-4xl">
          Our Recent <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Workings</span>
        </h1>
        <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
      </div>

      {/* YOUTUBE VIDEO — with glow */}
      <div className="relative max-w-5xl mx-auto mb-16 group">
        <div className="absolute transition duration-500 -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50"></div>
        <div className="relative overflow-hidden bg-black shadow-2xl rounded-2xl">
          <div className="aspect-video">
            <ReactPlayer src="https://youtu.be/nI8HxyzwsAI" width="100%" height="100%" controls />
          </div>
        </div>
      </div>

      {/* CAROUSEL */}
      <div className="relative mb-12 workings-swiper">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          speed={1000}
          autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation={{ nextEl: ".workings-next", prevEl: ".workings-prev" }}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 1.4 },
            1024: { slidesPerView: 1.8 },
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 180,
            modifier: 2.2,
            slideShadows: false,
          }}
          className="!pb-16"
        >
          {banners.map((b) => (
            <SwiperSlide key={b.id}>
              <div className="flex flex-col w-full overflow-hidden transition-all duration-500 bg-white shadow-xl group/card rounded-2xl hover:shadow-2xl hover:-translate-y-2">
                <div className="relative w-full h-[280px] sm:h-[380px] md:h-[440px] overflow-hidden">
                  <img
                    src={b.src}
                    alt={b.title}
                    className="object-contain object-center w-full h-full transition-transform duration-700 group-hover/card:scale-105"
                  />
                </div>
                <div className="relative w-full px-6 py-5 text-center bg-white border-t border-gray-100">
                  <div className="absolute top-0 w-0 h-1 transition-all duration-500 -translate-x-1/2 rounded-full left-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover/card:w-20" />
                  <h3 className="text-lg font-bold text-gray-800 md:text-xl">{b.title}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ✨ CUSTOM GLASS ARROWS */}
        <button
          className="absolute left-0 z-20 items-center justify-center hidden w-12 h-12 text-gray-700 transition-all duration-300 -translate-y-1/2 border rounded-full shadow-lg workings-prev md:-left-6 top-1/2 md:flex bg-white/70 backdrop-blur-md border-white/60 hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:border-transparent hover:shadow-blue-400/50 hover:scale-110 active:scale-95"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
        </button>

        <button
          className="absolute right-0 z-20 items-center justify-center hidden w-12 h-12 text-gray-700 transition-all duration-300 -translate-y-1/2 border rounded-full shadow-lg workings-next md:-right-6 top-1/2 md:flex bg-white/70 backdrop-blur-md border-white/60 hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:border-transparent hover:shadow-blue-400/50 hover:scale-110 active:scale-95"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-8 mt-12 bg-white border border-gray-100 shadow-sm md:p-12 rounded-2xl">
        <h3 className="mb-4 text-2xl font-bold text-gray-900">समाज सेवा और शिक्षा का संकल्प</h3>
        <div className="w-16 h-1 mb-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        <div className="space-y-4 text-lg leading-relaxed text-gray-600">
          <p>
            <strong className="text-gray-800">विद्या एडवांस एजुकेशन</strong> और{" "}
            <strong className="text-gray-800">अखिल भारतीय क्षत्रिय महासभा</strong> के द्वारा समाज सेवा की दिशा में एक महत्वपूर्ण पहल की गई है। हमारा मुख्य उद्देश्य आर्थिक रूप से कमजोर बच्चों को शिक्षा की मुख्यधारा से जोड़ना है, ताकि उनका भविष्य उज्ज्वल हो सके।
          </p>
          <p>
            इसी क्रम में, मान्या बिटिया के जन्मदिन के उपलक्ष्य में एक{" "}
            <strong className="text-blue-600">बैग वितरण कार्यक्रम</strong> का आयोजन किया गया।
          </p>
          <p>
            हमारा प्रयास है कि समाज का हर वर्ग शिक्षा के क्षेत्र में आगे बढ़े। हम युवाओं को सशक्त बनाने, उन्हें सही मार्गदर्शन देने और सामाजिक समरसता को बढ़ाने के लिए निरंतर कार्यरत हैं।
          </p>
        </div>

        <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">A Resolution for Social Service and Education</h3>
        <div className="w-16 h-1 mb-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        <div className="space-y-4 text-lg leading-relaxed text-gray-600">
          <p>
            <strong className="text-gray-800">Vidhya Advance Education Social Welfare Society</strong> and{" "}
            <strong className="text-gray-800">Akhil Bharatiya Chatriya Mahasabha</strong> have taken an important initiative in the direction of social service.
          </p>
          <p>
            In this sequence, a <strong className="text-blue-600">Bag Distribution Program</strong> was organized on the occasion of the birthday of the respected daughter.
          </p>
          <p>
            Our effort is that every section of society should move forward in the field of education. We are continuously working to empower the youth and increase social harmony.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mt-8">
          <button className="px-8 py-3 font-semibold text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-400/50 hover:scale-105">
            Read More
          </button>
          <button className="px-8 py-3 font-semibold text-gray-800 transition-all duration-300 bg-gray-100 rounded-full hover:bg-gray-200">
            Contact Us
          </button>
        </div>
      </div>
    </div>

    {/* ✨ CUSTOM SWIPER STYLES */}
    <style>{`
      /* Pagination — gradient active bullet */
      .workings-swiper .swiper-pagination {
        bottom: 0 !important;
      }
      .workings-swiper .swiper-pagination-bullet {
        background: #cbd5e1;
        opacity: 1;
        width: 8px;
        height: 8px;
        transition: all 0.35s ease;
      }
      .workings-swiper .swiper-pagination-bullet-active {
        background: linear-gradient(to right, #2563eb, #4f46e5);
        width: 32px;
        border-radius: 9999px;
      }
      /* Hide default arrows (using custom ones) */
      .workings-swiper .swiper-button-next,
      .workings-swiper .swiper-button-prev {
        display: none !important;
      }
    `}</style>
  </div>
);

export default Workings;