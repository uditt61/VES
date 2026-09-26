import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  fadeInRight,
  scaleIn,
  staggerContainer,
  viewportOnce,
} from '../../utils/motionVariants.js';

const Director = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full px-4 py-16 overflow-hidden bg-gradient-to-br from-blue-50 to-white sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-14"
        >
          <motion.span
            variants={fadeInRight}
            className="inline-block text-sm font-semibold tracking-wider text-blue-600 uppercase"
          >
            Leadership Speak
          </motion.span>
          <motion.h2
            variants={fadeInRight}
            className="mt-2 text-3xl font-bold text-gray-800 md:text-4xl"
          >
            Message from Our Director
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '6rem' }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 mx-auto mt-4 bg-orange-500 rounded-full"
          />
        </motion.div>

        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* LEFT: Images Section */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative flex justify-center w-full lg:w-5/12 lg:justify-start"
          >
            {/* Background Decorative Shape */}
            <div className="absolute w-40 h-40 bg-blue-200 rounded-full -top-6 -left-6 mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
            <div className="absolute w-40 h-40 bg-orange-200 rounded-full -bottom-8 -right-4 mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>

            {/* Main Image */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6 }}
              className="relative z-10 overflow-hidden border-4 border-white shadow-2xl w-72 h-80 sm:w-80 sm:h-96 rounded-3xl"
            >
              <img
                src="/Desk1.jpeg"
                alt="Director"
                loading="lazy"
                className="object-cover object-top w-full h-full"
              />
            </motion.div>

            {/* Floating Small Image */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="absolute z-20 w-32 h-32 overflow-hidden border-4 border-white shadow-xl -bottom-6 right-4 sm:right-10 sm:w-40 sm:h-40 rounded-2xl"
            >
              <img
                src="/Desk2.jpeg"
                alt="Director Working"
                loading="lazy"
                className="object-cover w-full h-full"
              />
            </motion.div>

            {/* Experience Badge */}
            <motion.div
              initial={
                shouldReduceMotion ? false : { opacity: 0, scale: 0.7, y: -10 }
              }
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.4,
              }}
              className="absolute z-30 px-4 py-3 bg-white border-l-4 border-orange-500 shadow-lg top-4 -right-2 sm:right-0 rounded-xl"
            >
              <p className="text-2xl font-bold text-gray-800">15+</p>
              <p className="text-xs font-medium text-gray-500">
                Years of
                <br />
                Excellence
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT: Text Content */}
          <motion.div
            variants={staggerContainer(0.12, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="w-full mt-10 lg:w-7/12 lg:mt-0"
          >
            <motion.svg
              variants={fadeInRight}
              className="w-12 h-12 mb-4 text-blue-200"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </motion.svg>

            <motion.p
              variants={fadeInRight}
              className="mb-6 text-lg italic leading-relaxed text-gray-600"
            >
              "Education is not just about books and degrees; it is about shaping character,
              building confidence, and creating leaders who can transform society. At Vidhya
              Advance, we are committed to providing a nurturing environment where every student
              discovers their true potential and achieves their dreams."
            </motion.p>

            <motion.p
              variants={fadeInRight}
              className="mb-8 text-base leading-relaxed text-gray-600"
            >
              With a vision to empower the youth of tomorrow, we have consistently strived to
              bridge the gap between academic learning and real-world success. Our dedicated team
              works tirelessly to ensure that every student receives the guidance and support they
              need to excel in their chosen path.
            </motion.p>

            <motion.div
              variants={fadeInRight}
              className="flex items-center gap-4 pt-6 border-t border-gray-200"
            >
              <div>
                <h4 className="text-xl font-bold text-gray-800">Dr. Abhishek Gupta</h4>
                <p className="text-sm font-medium text-blue-600">
                  Director, Vidhya Advance Education Consultancy
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Director;