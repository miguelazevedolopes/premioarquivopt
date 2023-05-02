/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  theme: {
    extend: {
      colors:{
        'PS' : '#ff66ff',
        'PSD' : '#f68a21',
        'PAN': '#333399',
        'PCP': '#EC1B24',
        'LIVRE' : '#00CD8C',
        'IL': '#52c1ec',
        'CHEGA': '#333399',
        'BE': '#000000' 
      }
    },
  },
  plugins: [],
}

