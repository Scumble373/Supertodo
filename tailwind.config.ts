import { transform } from "next/dist/build/swc";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'bg-flag1',
    'bg-flag2',
    'bg-flag3',
    'bg-flag4',
    'bg-flag5',
    'bg-flag6',
    'bg-flag7',
    'bg-flag8',
    'bg-flag9'
  ],
  theme: {
    extend: {
      height: {
        '100vh' : '100vh'
      },
      colors: {
        light: "var(--light)",
        dark: "var(--dark)",
        accent: "var(--accent)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        flag1: "var(--flag1)",
        flag2: "var(--flag2)",
        flag3: "var(--flag3)",
        flag4: "var(--flag4)",
        flag5: "var(--flag5)",
        flag6: "var(--flag6)",
        flag7: "var(--flag7)",
        flag8: "var(--flag8)",
        flag9: "var(--flag9)"
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      margin: {
        '6': '50px',
        '7': '100px',
      },
      keyframes: {
        slideIn: {
          '0%': {
            transform: 'translateX(30px)'
          },
          '100%': {
            transform: 'translateX(0px)'
          }
        }
      },
      animation: {
        slideIn: 'slideIn 0.25s ease-in-out',
      }
    },
  },
  plugins: [],
};
export default config;
