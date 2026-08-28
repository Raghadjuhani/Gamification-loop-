/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0b1220",
        surface: "#131c2e",
        line: "#232f45",
        ink: "#F5F7FA",
        muted: "#8A97AA",
        accent: "#2DD4A7",
        rust: "#E0785A",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "sans-serif",
        ],
      },
      borderRadius: {
        card: "12px",
        control: "8px",
      },
    },
  },
  plugins: [],
};
