import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BASE_URL, SITE_NAME, DEFAULT_OG_IMAGE, buildPageTitle } from '../../utils/seoData.js';

/**
 * SEOHead — Reusable component for per-page <head> management.
 *
 * @param {string} title      — Page title (will be appended with site name)
 * @param {string} description — Meta description
 * @param {string} keywords   — Comma-separated keywords
 * @param {string} canonicalPath — Path (e.g. '/about') for canonical URL
 * @param {string} ogImage    — Open Graph image URL (defaults to site banner)
 * @param {string} ogType     — OG type (defaults to 'website')
 * @param {Array}  jsonLd     — Array of JSON-LD schema objects
 */
export const SEOHead = ({
  title,
  description,
  keywords,
  canonicalPath = '',
  ogImage,
  ogType = 'website',
  jsonLd = [],
}) => {
  const fullTitle = buildPageTitle(title);
  const canonicalUrl = canonicalPath
    ? `${BASE_URL}${canonicalPath}`
    : BASE_URL;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="icon" type="image/png" href="/logoVES.png" />
      <link rel="apple-touch-icon" href="/logoVES.png" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content={SITE_NAME} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Geo Tags */}
      <meta name="geo.region" content="IN-MP" />
      <meta name="geo.placename" content="Bhopal" />
      <meta name="geo.position" content="23.2332;77.4344" />
      <meta name="ICBM" content="23.2332, 77.4344" />

      {/* JSON-LD Structured Data */}
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};
