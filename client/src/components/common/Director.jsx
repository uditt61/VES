import React from 'react'

const Director = () => {
  return (
    <section className="w-full bg-gradient-to-br from-blue-50 to-white py-16 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-14">
          <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">
            Leadership Speak
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
            Message from Our Director
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* LEFT: Images Section */}
          <div className="relative w-full lg:w-5/12 flex justify-center lg:justify-start">
            
            {/* Background Decorative Shape */}
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-8 -right-4 w-40 h-40 bg-orange-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>

            {/* Main Image (desk1) */}
            <div className="relative z-10 w-72 h-80 sm:w-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="/Desk1.jpeg" 
                alt="Director" 
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Floating Small Image (desk2) - Bottom Right */}
            <div className="absolute z-20 -bottom-6 right-4 sm:right-10 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img 
                src="/Desk2.jpeg" 
                alt="Director Working" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Experience Badge */}
            <div className="absolute z-30 top-4 -right-2 sm:right-0 bg-white shadow-lg rounded-xl px-4 py-3 border-l-4 border-orange-500">
              <p className="text-2xl font-bold text-gray-800">15+</p>
              <p className="text-xs text-gray-500 font-medium">Years of<br/>Excellence</p>
            </div>
          </div>

          {/* RIGHT: Text Content Section */}
          <div className="w-full lg:w-7/12 mt-10 lg:mt-0">
            
            {/* Quote Icon */}
            <svg className="w-12 h-12 text-blue-200 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            <p className="text-gray-600 text-lg leading-relaxed mb-6 italic">
              "Education is not just about books and degrees; it is about shaping character, 
              building confidence, and creating leaders who can transform society. At Vidhya Advance, 
              we are committed to providing a nurturing environment where every student discovers 
              their true potential and achieves their dreams."
            </p>

            <p className="text-gray-600 text-base leading-relaxed mb-8">
              With a vision to empower the youth of tomorrow, we have consistently strived to 
              bridge the gap between academic learning and real-world success. Our dedicated 
              team works tirelessly to ensure that every student receives the guidance and 
              support they need to excel in their chosen path.
            </p>

            {/* Director Signature */}
            <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
              <div>
                <h4 className="text-xl font-bold text-gray-800">Dr.Abhishek Gupta </h4>
                <p className="text-blue-600 font-medium text-sm">Director, Vidhya Advance Education Consultancy</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Director