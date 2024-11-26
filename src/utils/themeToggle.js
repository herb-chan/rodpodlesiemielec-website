// themeToggle.js

// Function to apply a theme: light, dark, grayscale, or high-contrast
export const setTheme = (theme) => {
  const currentTheme = localStorage.getItem('theme');
  console.log(
    `Current: ${currentTheme}\nSet to: ${theme}\nEqual?: ${currentTheme === theme}`
  );

  document.documentElement.setAttribute('data-theme', theme);
  console.log(`Applied theme: ${theme}`);

  localStorage.setItem('theme', theme);
};

// Function to get the stored theme with a fallback to 'light'
export const getStoredTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  return storedTheme;
};
