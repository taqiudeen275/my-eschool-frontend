import {nextui} from '@nextui-org/theme'
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme:{
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            primary: {
              foreground: "hsl(var(--primary-foreground))",
              DEFAULT: "#e8007a",
              50: "#fef1f7",
              100: "#fee5f1",
              200: "#ffcce4",
              300: "#ffa1ce",
              400: "#ff67b3",
              500: "#ff3498",
              600: "#e8007a", // Your primary color
              700: "#cc006c",
              800: "#a8005a",
              900: "#8c004c",
            },
            focus: "#e8007a",
          },
        },
        dark: {
          colors: {
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            primary: {
              foreground: "hsl(var(--primary-foreground))",
              DEFAULT: "#e8007a",
              50: "#fef1f7",
              100: "#fee5f1",
              200: "#ffcce4",
              300: "#ffa1ce",
              400: "#ff67b3",
              500: "#ff3498",
              600: "#e8007a", // Your primary color
              700: "#cc006c",
              800: "#a8005a",
              900: "#8c004c",
            },
            focus: "#e8007a",
          },
        },
      },
      layout: {
        radius: {
          small: "2px",
          medium: "4px",
          large: "6px",
        },
        borderWidth: {
          small: "1px",
          medium: "2px",
          large: "3px",
        },
      },
    }),
  ],
} satisfies Config;
