import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

// Extensions fixed: e20 & e21 = .png | Baaki sab = .jpeg
const slidesData = [
  { img: '/e3.jpeg', title: 'Excellence Awards', desc: 'Recognizing outstanding achievements and academic brilliance of our students.' },
  { img: '/e4.jpeg', title: 'Annual Felicitation', desc: 'Honoring the hard work and dedication of our top performers.' },
  { img: '/e6.jpeg', title: 'Proud Moments', desc: 'Celebrating success and milestones achieved by the Vidhya Advance family.' },
  { img: '/e7.jpeg', title: 'Community Engagement', desc: 'Building strong relationships and guiding the youth for a better tomorrow.' },
  { img: '/e9.jpeg', title: 'Student Achievements', desc: 'Awarding excellence and encouraging students to reach greater heights.' },
  { img: '/e10.jpeg', title: 'Rewarding Success', desc: 'Felicitation ceremonies that motivate and inspire our future leaders.' },
  { img: '/e20.png', title: 'Media & Outreach', desc: 'Spreading awareness and sharing our vision through prominent platforms.' },
  { img: '/e21.png', title: 'Guidance & Support', desc: 'Dedicated mentorship to help students choose the right career path.' },
]

const MoreWork = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return
    const autoplay = setInterval(() => emblaApi.scrollNext(), 3000)
    const stopAutoplay = () => clearInterval(autoplay)
    emblaApi.on('pointerDown', stopAutoplay)
    return () => clearInterval(autoplay)
  }, [emblaApi])

  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-4 relative">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Our Journey
      </h2>

      {/* Carousel + Arrows Wrapper */}
      <div className="relative group">
        
        {/* Left Arrow Button */}
        <button 
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 hidden md:block"
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Carousel Viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slidesData.map((slide, index) => (
              <div 
                key={index} 
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] px-3"
              >
                <div className="flex flex-col items-center">
                  <div className="w-full h-72 mb-4 flex items-center justify-center">
                    <img 
                      src={slide.img} 
                      alt={slide.title} 
                      className="max-w-full max-h-full object-contain" 
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900">{slide.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 max-w-xs">{slide.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow Button */}
        <button 
          onClick={() => emblaApi?.scrollNext()}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 hidden md:block"
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

    </div>
  )
}

export default MoreWork