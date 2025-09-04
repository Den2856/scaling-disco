// client/tailwind.config.cjs
const { error } = require('console')
const palette = require('./src/design/palette')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        neutral: palette.neutral,
        white: palette.white,
        black: palette.black,
        background: palette.background,
        primary: {
          DEFAULT: palette.primary,
          light:   palette['primary-light'],
        },
        accent: palette.accent,
        azul: palette.azul,
        error: palette.error,
        gradient: {
          from: palette.gradientFrom,
          to: palette.gradientTo,
        },
        blue: palette.formBlue,
        foreground: palette.foreground,
        outline: palette.outline,
        button: palette.button,
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: [],
}
