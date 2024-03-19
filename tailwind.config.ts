//@ts-ignore
import type { Config } from 'tailwindcss'
//@ts-ignore
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        orange: {
          500: "#CF8802"
        },
        brown: {
          500: "#824C27"
        }
      }
    },
    fontFamily: {
      'roboto': ['Robot', 'sans-serif'],
    },
  },
}
