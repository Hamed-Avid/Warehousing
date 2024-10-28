/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bkg: "rgba(var(--color-background))",
        frg: "rgba(var(--color-foreground))",
        primary: "rgba(var(--color-primary))",
        secondary: "rgba(var(--color-secondary))",
        tertiary: "rgba(var(--color-tertiary))",
        success: "rgba(var(--color-success))",
        danger: "rgba(var(--color-danger))",
      },
    },
  },
  plugins: [],
};
