import React from "react";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";

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
  <div className="w-full py-16 font-sans bg-slate-50">
    <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">

      {/* HEADING */}
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-2xl font-medium text-gray-500">
          Our Recent <span className="font-bold text-blue-600">Workings</span>
        </h1>
        <div className="w-24 h-1 mx-auto bg-blue-600 rounded-full"></div>
      </div>

      {/* YOUTUBE VIDEO */}
      <div className="max-w-6xl mx-auto mb-12 overflow-hidden bg-black shadow-lg rounded-2xl">
        <div className="aspect-video">
          <ReactPlayer src="https://youtu.be/nI8HxyzwsAI" width="100%" height="100%" controls />
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
          speed={900}
          autoplay={{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{ 640: { slidesPerView: 1.2 }, 768: { slidesPerView: 1.4 }, 1024: { slidesPerView: 1.7 } }}
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 120, modifier: 2, slideShadows: true }}
          className="!pb-14"
        >
          {banners.map((b) => (
            <SwiperSlide key={b.id}>
              <div className="flex flex-col w-full overflow-hidden bg-white shadow-xl rounded-2xl">
                <div className="w-full h-[280px] sm:h-[380px] md:h-[450px]">
                  <img src={b.src} alt={b.title} className="object-contain object-center w-full h-full" />
                </div>
                <div className="w-full px-6 py-5 text-center bg-white border-t border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 md:text-xl">{b.title}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CONTENT */}
      <div className="p-8 mt-12 bg-white border border-gray-100 shadow-sm md:p-12 rounded-2xl">
        <h3 className="mb-4 text-2xl font-bold text-gray-900">समाज सेवा और शिक्षा का संकल्प</h3>
        <div className="w-16 h-1 mb-6 bg-blue-600 rounded-full"></div>
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
        <div className="w-16 h-1 mb-6 bg-blue-600 rounded-full"></div>
        <div className="space-y-4 text-lg leading-relaxed text-gray-600">
          <p>
            <strong className="text-gray-800">Vidhya Advance Education</strong> and{" "}
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
          <button className="px-8 py-3 font-semibold text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700">Read More</button>
          <button className="px-8 py-3 font-semibold text-gray-800 bg-gray-100 rounded-full hover:bg-gray-200">Contact Us</button>
        </div>
      </div>
    </div>

    {/* WHITE ARROWS */}
    <style>{`
      .workings-swiper .swiper-button-next,
      .workings-swiper .swiper-button-prev {
        color: #fff !important;
        background: rgba(0,0,0,0.35);
        width: 44px; height: 44px;
        border-radius: 9999px;
        backdrop-filter: blur(4px);
      }
      .workings-swiper .swiper-button-next:hover,
      .workings-swiper .swiper-button-prev:hover { background: rgba(0,0,0,0.6); }
      .workings-swiper .swiper-button-next::after,
      .workings-swiper .swiper-button-prev::after { font-size: 18px; font-weight: bold; color: #fff !important; }
    `}</style>
  </div>
);

export default Workings;