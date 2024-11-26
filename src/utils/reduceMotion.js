// reduceMotion.js

// Function to enable or disable reduced motion
export const setReducedMotion = (enabled) => {
  document.documentElement.setAttribute(
    'data-reduce-motion',
    enabled ? 'true' : 'false'
  );
  localStorage.setItem('reduceMotion', enabled ? 'true' : 'false');
};

// Function to get the reduced motion preference from localStorage
export const getReducedMotionPreference = () => {
  const storedPreference = localStorage.getItem('reduceMotion');
  return storedPreference === 'true'; // Default is false if not set
};
