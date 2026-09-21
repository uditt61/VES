/**
 * Utility to escape regular expression special characters to prevent ReDoS / NoSQL injection
 * @param {string} str - Raw input search string
 * @returns {string} - Escaped safe string for RegExp
 */
export const escapeRegex = (str) => {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
