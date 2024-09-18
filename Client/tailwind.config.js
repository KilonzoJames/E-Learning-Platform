/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
    extend: {
      colors: {
        textwhite: "#EFF1F3",
        brightblue: "#0163af",
        lightgray: "#828282",
        sweetblue: "#015A9E;",
        somegray: "#828282",
        inputgray:"D3D5D6",
        labelgrey:"#939393",
        newgrey:"#4F4F4F",
        lightblue: "#2A9DF4",
        faintblue: "#eff6ff",
        greyish: "8d8d8d"
      },
    },
  },
  plugins: [],
}

