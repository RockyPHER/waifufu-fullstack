/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "bounce-left": {
          "0%, 100%": {
            transform: "translateX(10%)",
            "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "none",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
        },
        "bounce-right": {
          "0%, 100%": {
            transform: "translateX(-10%)",
            "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "none",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
        },
        "onload-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "unload-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "onload-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "onload-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "onload-down": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        "bounce-left": "bounce-left 1s ease-in-out infinite",
        "onload-left-1": "onload-left 0.2s ease-in-out",
        "onload-left-2": "onload-left 0.4s ease-in-out",
        "onload-left-3": "onload-left 0.6s ease-in-out",
        "onload-left-4": "onload-left 0.8s ease-in-out",
        "onload-left-5": "onload-left 1s ease-in-out",
        "onload-left-6": "onload-left 1.2s ease-in-out",
        "onload-left-7": "onload-left 1.4s ease-in-out",
        "onload-left-8": "onload-left 1.6s ease-in-out",
        "unload-left": "onload-left 0.5s ease-in-out",
        "onload-right-1": "onload-right-1 1s ease-in-out",
        "onload-right-1.1": "onload-right-1.1 1.1s ease-in-out",
        "onload-right-1.2": "onload-right-1.2 1.2s ease-in-out",
        "onload-right-1.3": "onload-right-1.3 1.3s ease-in-out",
        "onload-right-1.4": "onload-right-1.4 1.4s ease-in-out",
        "onload-right-1.5": "onload-right-1.5 1.5s ease-in-out",
        "onload-right-1.6": "onload-right-1.6 1.6s ease-in-out",
        "onload-right-1.7": "onload-right-1.7 1.7s ease-in-out",
        "onload-up": "onload-up 1s ease-in-out",
        "onload-down": "onload-down 1s ease-in-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}

