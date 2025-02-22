module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust the paths as necessary
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        gray: {
          100: '#f7fafc',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
        },
        blue: {
          500: '#4299e1',
          600: '#3182ce',
        },
        green: {
          500: '#48bb78',
          600: '#38a169',
        },
        red: {
          500: '#f56565',
          600: '#e53e3e',
        },
      },
    },
  },
  plugins: [],
}
