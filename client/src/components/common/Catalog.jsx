import React from 'react';

const Catalog = () => {
  return (
    <div className="flex flex-col md:flex-row gap-5 items-center max-w-[900px] mx-auto font-sans p-4">
      {/* Left Side: Banner Image */}
      <div className="flex-1 w-full">
        <img 
          src="./banners4.jpeg" 
          alt="AIMLAY Ph.D. Admission Banner" 
          className="object-cover w-full h-auto rounded-lg"
        />
      </div>

      {/* Right Side: Description Section */}
      <div className="flex-[1.2] text-gray-800">
        <h2 className="text-[#0b2545] text-2xl font-bold mt-0 mb-2">
          Ph.D. Admission Open 
        </h2>
        <p className="leading-relaxed text-[15px] text-gray-700">
          Take the next step in your professional journey and turn your experience into a Doctorate. 
          Aimlay offers comprehensive Ph.D. guidance and admission support tailored for working 
          professionals, healthcare experts, and faculty members.
        </p>

        <h4 className="text-[#0b2545] text-lg font-semibold mt-4 mb-2">
          Key Highlights:
        </h4>
        <ul className="list-disc pl-5 leading-relaxed space-y-1 text-gray-700 text-[15px]">
          <li>Flexible formats tailored to fit your schedule</li>
          <li>End-to-end assistance throughout your Ph.D. journey</li>
          <li>Expert academic guidance at every step</li>
          <li>Wide range of subjects including Management, Science, Humanities, and Healthcare</li>
        </ul>
      </div>
    </div>
  );
};

export default Catalog;