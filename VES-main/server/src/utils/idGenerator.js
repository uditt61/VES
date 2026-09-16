import crypto from 'crypto';

export const generateEnquiryId = () => {
  const year = new Date().getFullYear();
  const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `VAE-${year}-${randomHex}`;
};

export const generateGrievanceId = () => {
  const year = new Date().getFullYear();
  const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `GRV-${year}-${randomHex}`;
};
