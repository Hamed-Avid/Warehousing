/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bkg: "rgba(var(--color-background))",
      },
    },
  },
  plugins: [],
};
