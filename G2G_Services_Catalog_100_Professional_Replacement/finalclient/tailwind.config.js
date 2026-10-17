/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#009999",
        secondary: "#003B49",
        accent: "#FF6B00",
        light: "#F6F8FA",
        dark: "#1E293B",
      },

      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },

      boxShadow: {
        card: "0 10px 30px rgba(0,0,0,.08)",
      },

      borderRadius: {
        xl2: "18px",
      },
    },
  },
  plugins: [],
};