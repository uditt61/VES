import React from 'react';
import { motion } from 'framer-motion';
import {
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  viewportOnce,
} from '../../utils/motionVariants.js';

const listItem = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const Catalog = () => {
  return (
    <div className="flex flex-col md:flex-row gap-5 items-center max-w-[900px] mx-auto font-sans p-4">
      {/* Left Side: Banner Image */}
      <motion.div
        variants={fadeInLeft}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="flex-1 w-full"
      >
        <img
          src="/bannerAim.png"
          alt="AIMLAY Ph.D. Admission Banner"
          loading="lazy"
          className="object-cover w-full h-auto rounded-lg shadow-md"
        />
      </motion.div>

      {/* Right Side: Description Section */}
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="flex-[1.2] text-gray-800"
      >
        <motion.h2
          variants={fadeInRight}
          className="text-[#0b2545] text-2xl font-bold mt-0 mb-2"
        >
          Ph.D. Admission Open
        </motion.h2>
        <motion.p
          variants={fadeInRight}
          className="leading-relaxed text-[15px] text-gray-700"
        >
          Take the next step in your professional journey and turn your experience into a Doctorate.
          Aimlay offers comprehensive Ph.D. guidance and admission support tailored for working
          professionals, healthcare experts, and faculty members.
        </motion.p>

        <motion.h4
          variants={fadeInRight}
          className="text-[#0b2545] text-lg font-semibold mt-4 mb-2"
        >
          Key Highlights:
        </motion.h4>
        <motion.ul
          variants={staggerContainer(0.08)}
          className="list-disc pl-5 leading-relaxed space-y-1 text-gray-700 text-[15px]"
        >
          <motion.li variants={listItem}>
            Flexible learning options designed for working professionals
          </motion.li>
          <motion.li variants={listItem}>
            Personalized support from admission to thesis completion
          </motion.li>
          <motion.li variants={listItem}>
            Research guidance from experienced academic experts
          </motion.li>
          <motion.li variants={listItem}>
            Ph.D. opportunities across diverse academic disciplines
          </motion.li>
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default Catalog;