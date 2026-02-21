export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#121212',
          surface: '#1E1E1E',
          button: '#333333',
          accent: '#FF9500',
          muted: '#A5A5A5',
        }
      }
    },
  },
  plugins: [],
}
