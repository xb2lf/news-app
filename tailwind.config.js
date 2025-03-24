/*
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-03-23 18:06:57
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-23 21:27:22
 * @Description: 
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}

