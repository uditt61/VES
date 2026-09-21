import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

const Workings = () => {
  const banners = [
    { id: 1, src: "/banner3.jpeg", title: "शिक्षा और सहायता" },
    { id: 2, src: "/banner11.jpeg", title: "बैग वितरण कार्यक्रम" },
    { id: 3, src: "/banner13.jpeg", title: "सामाजिक कल्याण" },
    { id: 4, src: "/banner14.jpeg", title: "युवा शक्ति" },
  ];

  const [index, setIndex] = useState(0);

  // Auto-play: Har 2 second me next slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const goNext = () => setIndex((prev) => (prev + 1) % banners.length);
  const goPrev = () => setIndex((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="w-full py-16 font-sans bg-slate-50">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        
        {/* ================= HEADING ================= */}
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-2xl font-medium text-gray-500">
            Our Recent <span className="font-bold text-blue-600">Workings</span>
          </h1>
          <div className="w-24 h-1 mx-auto bg-blue-600 rounded-full"></div>
        </div>

        {/* ================= YOUTUBE VIDEO (Bada) ================= */}
        <div className="max-w-6xl mx-auto mb-12 overflow-hidden bg-black shadow-lg rounded-2xl">
          <div className="aspect-video">
            <ReactPlayer
              src="https://youtu.be/nI8HxyzwsAI"
              width="100%"
              height="100%"
              controls
            />
          </div>
        </div>

        {/* ================= FADE CAROUSEL (Bada) ================= */}
        <div className="relative w-full overflow-hidden bg-gray-900 shadow-xl rounded-2xl group h-[350px] sm:h-[450px] md:h-[550px]">
          {banners.map((banner, i) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                i === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={banner.src}
                alt={banner.title}
                className="object-contain object-center w-full h-full bg-gray-900"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 pt-20 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold text-white md:text-2xl">{banner.title}</h3>
              </div>
            </div>
          ))}

          {/* Arrows */}
          <button onClick={goPrev} className="absolute z-20 p-2 text-gray-800 -translate-y-1/2 rounded-full shadow-lg opacity-0 top-1/2 left-4 bg-white/80 hover:bg-white group-hover:opacity-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={goNext} className="absolute z-20 p-2 text-gray-800 -translate-y-1/2 rounded-full shadow-lg opacity-0 top-1/2 right-4 bg-white/80 hover:bg-white group-hover:opacity-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>

          {/* Dots */}
          <div className="absolute z-20 flex gap-2 -translate-x-1/2 bottom-4 left-1/2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === index ? "bg-blue-500 w-6" : "bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ================= CONTENT SECTION ================= */}
        <div className="p-8 mt-12 bg-white border border-gray-100 shadow-sm md:p-12 rounded-2xl">
          
          {/* HINDI */}
          <h3 className="mb-4 text-2xl font-bold text-gray-900">
            समाज सेवा और शिक्षा का संकल्प
          </h3>
          <div className="w-16 h-1 mb-6 bg-blue-600 rounded-full"></div>
          <div className="space-y-4 text-lg leading-relaxed text-gray-600">
            <p>
              <strong className="text-gray-800">विद्या एडवांस एजुकेशन</strong> और <strong className="text-gray-800">अखिल भारतीय क्षत्रिय महासभा</strong> के द्वारा समाज सेवा की दिशा में एक महत्वपूर्ण पहल की गई है। हमारा मुख्य उद्देश्य आर्थिक रूप से कमजोर बच्चों को शिक्षा की मुख्यधारा से जोड़ना है, ताकि उनका भविष्य उज्ज्वल हो सके।
            </p>
            <p>
              इसी क्रम में, मान्या बिटिया के जन्मदिन के उपलक्ष्य में एक <strong className="text-blue-600">बैग वितरण कार्यक्रम</strong> का आयोजन किया गया।
            </p>
            <p>
              हमारा प्रयास है कि समाज का हर वर्ग शिक्षा के क्षेत्र में आगे बढ़े। हम युवाओं को सशक्त बनाने, उन्हें सही मार्गदर्शन देने और सामाजिक समरसता को बढ़ाने के लिए निरंतर कार्यरत हैं।
            </p>
          </div>

          {/* ENGLISH */}
          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">
            A Resolution for Social Service and Education
          </h3>
          <div className="w-16 h-1 mb-6 bg-blue-600 rounded-full"></div>
          <div className="space-y-4 text-lg leading-relaxed text-gray-600">
            <p>
              <strong className="text-gray-800">Vidhya Advance Education Social Welfare Society</strong> and <strong className="text-gray-800">Akhil Bharatiya Chatriya Mahasabha</strong> have taken an important initiative in the direction of social service.
            </p>
            <p>
              In this sequence, a <strong className="text-blue-600">Bag Distribution Program</strong> was organized on the occasion of the birthday of the respected daughter.
            </p>
            <p>
              Our effort is that every section of society should move forward in the field of education. We are continuously working to empower the youth and increase social harmony.
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-8">
            <button className="px-8 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-full shadow-md hover:bg-blue-700">
              Read More
            </button>
            <button className="px-8 py-3 font-semibold text-gray-800 transition-colors bg-gray-100 rounded-full hover:bg-gray-200">
              Contact Us
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Workings;