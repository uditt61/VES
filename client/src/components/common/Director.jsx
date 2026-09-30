import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Quote } from 'lucide-react';
import {
  fadeInRight,
  scaleIn,
  staggerContainer,
  viewportOnce,
} from '../../utils/motionVariants.js';

// ─── Data ────────────────────────────────────────────────────────────────────

const DIRECTOR = {
  name: 'Dr. Abhishek Gupta',
  role: 'Director, Vidhya Advance Education Consultancy',
  quote:
    'Education is not just about books and degrees; it is about shaping character, building confidence, and creating leaders who can transform society. At Vidhya Advance, we are committed to providing a nurturing environment where every student discovers their true potential and achieves their dreams.',
  bio: 'With a vision to empower the youth of tomorrow, we have consistently strived to bridge the gap between academic learning and real-world success. Our dedicated team works tirelessly to ensure that every student receives the guidance and support they need to excel in their chosen path.',
  experience: 15,
  mainImage: '/Desk1.jpg',
  mainImageAlt: 'Director — Vidhya Advance Education Consultancy',
  secondaryImage: '/Desk2.jpeg',
  secondaryImageAlt: 'Director at work',
};

// ─── Local Variants ──────────────────────────────────────────────────────────

const imageReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const floatingImageReveal = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
};

const badgeReveal = {
  hidden: { opacity: 0, scale: 0.7, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
      delay: 0.4,
    },
  },
};

const underlineReveal = {
  hidden: { width: 0 },
  visible: {
    width: '6rem',
    transition: { duration: 0.6, delay: 0.3, ease: 'easeOut' },
  },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

const SectionHeader = () => (
  <motion.div
    variants={staggerContainer(0.1)}
    initial="hidden"
    whileInView="visible"
    viewport={viewportOnce}
    className="mb-14 text-center"
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
      variants={underlineReveal}
      className="h-1 mx-auto mt-4 bg-orange-500 rounded-full"
    />
  </motion.div>
);

const DecorativeBlobs = () => (
  <>
    <div
      aria-hidden="true"
      className="absolute w-40 h-40 bg-blue-200 rounded-full -top-6 -left-6 mix-blend-multiply filter blur-2xl opacity-70 animate-blob"
    />
    <div
      aria-hidden="true"
      className="absolute w-40 h-40 bg-orange-200 rounded-full -bottom-8 -right-4 mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"
    />
  </>
);

const ExperienceBadge = ({ years }) => (
  <motion.div
    variants={badgeReveal}
    className="absolute z-30 px-4 py-3 bg-white border-l-4 shadow-lg border-orange-500 top-4 -right-2 sm:right-0 rounded-xl"
  >
    <p className="text-2xl font-bold text-gray-800">{years}+</p>
    <p className="text-xs font-medium leading-tight text-gray-500">
      Years of
      <br />
      Excellence
    </p>
  </motion.div>
);

/**
 * MainDirectorImage
 * - Renders the main image with NO cropping and NO whitespace.
 * - Uses the image's natural aspect ratio dynamically via onLoad.
 * - Falls back to a 4/5 ratio until the image loads.
 */
const MainDirectorImage = () => {
  const [aspect, setAspect] = useState('4 / 5');

  const handleLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalWidth && naturalHeight) {
      setAspect(`${naturalWidth} / ${naturalHeight}`);
    }
  };

  return (
    <motion.div
      variants={imageReveal}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{ aspectRatio: aspect }}
      className="relative z-10 w-72 overflow-hidden border-4 border-white shadow-2xl bg-slate-100 sm:w-80 rounded-3xl"
    >
      <img
        src={DIRECTOR.mainImage}
        alt={DIRECTOR.mainImageAlt}
        loading="lazy"
        onLoad={handleLoad}
        className="block object-cover object-center w-full h-full"
      />
    </motion.div>
  );
};

const DirectorImages = () => (
  <motion.div
    variants={scaleIn}
    initial="hidden"
    whileInView="visible"
    viewport={viewportOnce}
    className="relative flex justify-center w-full lg:w-5/12 lg:justify-start"
  >
    <DecorativeBlobs />

    <MainDirectorImage />

    {/* Floating Small Image — full picture, matching ratio */}
    <motion.div
      variants={floatingImageReveal}
      style={{ aspectRatio: '1 / 1' }}
      className="absolute z-20 w-32 overflow-hidden bg-slate-100 border-4 border-white shadow-xl -bottom-6 right-4 sm:right-10 sm:w-40 rounded-2xl"
    >
      <img
        src={DIRECTOR.secondaryImage}
        alt={DIRECTOR.secondaryImageAlt}
        loading="lazy"
        className="block object-cover object-center w-full h-full"
      />
    </motion.div>

    <ExperienceBadge years={DIRECTOR.experience} />
  </motion.div>
);

const DirectorContent = () => (
  <motion.div
    variants={staggerContainer(0.12, 0.15)}
    initial="hidden"
    whileInView="visible"
    viewport={viewportOnce}
    className="w-full mt-10 lg:w-7/12 lg:mt-0"
  >
    <motion.div variants={fadeInRight}>
      <Quote className="w-12 h-12 mb-4 text-blue-200" strokeWidth={1.5} />
    </motion.div>

    <motion.p
      variants={fadeInRight}
      className="mb-6 text-lg italic leading-relaxed text-gray-600"
    >
      &ldquo;{DIRECTOR.quote}&rdquo;
    </motion.p>

    <motion.p
      variants={fadeInRight}
      className="mb-8 text-base leading-relaxed text-gray-600"
    >
      {DIRECTOR.bio}
    </motion.p>

    <motion.div
      variants={fadeInRight}
      className="flex items-center gap-4 pt-6 border-t border-gray-200"
    >
      <div>
        <h4 className="text-xl font-bold text-gray-800">{DIRECTOR.name}</h4>
        <p className="text-sm font-medium text-blue-600">{DIRECTOR.role}</p>
      </div>
    </motion.div>
  </motion.div>
);

// ─── Main Component ──────────────────────────────────────────────────────────

const Director = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full px-4 py-16 overflow-hidden bg-gradient-to-br from-blue-50 to-white sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeader />

        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <DirectorImages />
          <DirectorContent />
        </div>
      </div>

      {shouldReduceMotion && (
        <style>{`
          .animate-blob { animation: none !important; }
        `}</style>
      )}
    </section>
  );
};

export default Director;