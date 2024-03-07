/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
          "50%": {
            transform: "translateY(-10%)",
            "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
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
          "0%": { opacity: 0, transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "onload-down": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        opload: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        bounce: "bounce 0.8s ease-in-out infinite",
        "bounce-left": "bounce-left 1s ease-in-out infinite",
        "bounce-right": "bounce-right 1s ease-in-out infinite",
        "onload-left-1": "onload-left 0.2s ease-in-out",
        "onload-left-2": "onload-left 0.4s ease-in-out",
        "onload-left-3": "onload-left 0.6s ease-in-out",
        "onload-left-4": "onload-left 0.8s ease-in-out",
        "onload-left-5": "onload-left 1s ease-in-out",
        "onload-left-6": "onload-left 1.2s ease-in-out",
        "onload-left-7": "onload-left 1.4s ease-in-out",
        "onload-left-8": "onload-left 1.6s ease-in-out",
        "unload-left": "onload-left 0.5s ease-in-out",
        "onload-right-1": "onload-right 0.2s ease-in-out",
        "onload-right-2": "onload-right 0.4s ease-in-out",
        "onload-right-3": "onload-right 0.6s ease-in-out",
        "onload-right-4": "onload-right 0.8s ease-in-out",
        "onload-right-5": "onload-right 1s ease-in-out",
        "onload-right-6": "onload-right 1.2s ease-in-out",
        "onload-right-7": "onload-right 1.4s ease-in-out",
        "onload-right-8": "onload-right 1.6s ease-in-out",
        "onload-up": "onload-up 0.5s ease-in-out",
        "onload-down": "onload-down 0.5s ease-in-out",
        opload: "opload 0.5s ease-in-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
