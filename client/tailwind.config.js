/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#203A43",
      },
      display: ["group-hover"],
    },
    screens: {
      'mobile': '360px',

      'tablet': '768px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1180px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1570px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
  corePlugins:{
    preflight:false,
  }
}

