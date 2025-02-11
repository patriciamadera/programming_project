/** @type {import('tailwindcss').Config} */
export const content = [
  "./dist/**/*.html", // <- Incluye archivos HTML en dist/
  "./src/**/*.{html,js}"
];
export const theme = {
  screens: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  container: {
    center: true,
    padding: '1rem'
  },
  extend: {
    fontFamily: {
      poppins: "'Poppins', 'sans-serif'",
      roboto: "'Roboto', 'sans-serif'",
    },
    colors: {
      primary: '#FD3D57',
      secondary: '#324324',
    }
  },
};
export const variants = {
  extend: {},
};
export const plugins = [];

