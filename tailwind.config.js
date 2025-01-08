/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        navy: "#001f3f", // Custom Navy Blue color
        reddish: "#ff6347", // Custom Reddish color
        background: "var(--background)", // Optional custom CSS variables
        foreground: "var(--foreground)", // Optional custom CSS variables
        burgundy: {
          50: '#fdf2f4',
          100: '#fbe6e9',
          200: '#f5cdd3',
          300: '#efa4ae',
          400: '#e77283',
          500: '#d94560',
          600: '#c42d4b',
          700: '#a41e3d',
          800: '#891b37',
          900: '#731a31',
          950: '#400a17',
        }
      },
      animation: {
        "gradient-flow": "gradient-flow 6s infinite alternate", // Gradient animation
      },
      keyframes: {
        "gradient-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundSize: {
        "gradient-flow": "200% 200%", // Ensures the gradient flows properly
      },
    },
  },
  plugins: [],
} ;