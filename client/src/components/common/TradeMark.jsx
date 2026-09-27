import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motionVariants.js';

const TradeMark = () => {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-40px' }}
      className="flex justify-center w-full px-4 overflow-hidden"
    >
      <img
        src="/e44.jpeg"
        alt="Vidhya Advance Education Social Welfare Society"
        loading="lazy"
        className="block object-contain w-full h-auto max-w-4xl mx-auto shadow-lg rounded-2xl"
      />
    </motion.div>
  );
};

export default TradeMark;