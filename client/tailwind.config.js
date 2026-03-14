// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       animation: {
//         'blob': 'blob 7s infinite',
//         'slide-up': 'slideUp 0.3s ease-out',
//         'fade-in': 'fadeIn 0.5s ease-in',
//         'shimmer': 'shimmer 2s infinite',
//       },
//       keyframes: {
//         blob: {
//           '0%': { transform: 'translate(0px, 0px) scale(1)' },
//           '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
//           '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
//           '100%': { transform: 'translate(0px, 0px) scale(1)' },
//         },
//         slideUp: {
//           '0%': { transform: 'translateY(20px)', opacity: '0' },
//           '100%': { transform: 'translateY(0)', opacity: '1' },
//         },
//         fadeIn: {
//           '0%': { opacity: '0' },
//           '100%': { opacity: '1' },
//         },
//         shimmer: {
//           '0%': { backgroundPosition: '-200% 0' },
//           '100%': { backgroundPosition: '200% 0' },
//         },
//       },
//     },
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // 👈 Important: Enables class-based dark mode
  theme: {
    extend: {
      colors: {
        // Luxury Dark Palette
        dark: {
          bg: '#0F172A',       // Rich Slate Blue Background
          card: '#1E293B',     // Lighter Slate for Cards
          text: '#F1F5F9',     // Soft White Text
          muted: '#94A3B8',    // Muted Text
          border: '#334155'    // Subtle Border
        }
      },
      animation: {
        'blob': 'blob 7s infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-in',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}