import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',
        secondary: '#9333EA',
        accent: '#F59E0B',
        background: '#F3F4F6',
        card: '#FFFFFF',
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)',
        button: '0 2px 4px rgba(0, 0, 0, 0.2)',
    }},
  },
  plugins: [],
} satisfies Config;
