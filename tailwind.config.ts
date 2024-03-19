import type { Config } from 'tailwindcss'
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
    }
  }
}
