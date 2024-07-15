import type { City } from '~/types/organization'

export const useCityStore = defineStore('city', () => {
  const cookieCity = useCookie('city')
  cookieCity.value = cookieCity.value ? cookieCity.value : 'krd'

  const currentCity = ref<string | null>(cookieCity.value)

  const cities = reactive({
    krd: 'Краснодар',
    msk: 'Москва',
    rnd: 'Ростов-на-Дону',
    spb: 'Санкт-Петербург',
  })

  const currentCityName = computed(() => cities[currentCity.value as keyof typeof cities])

  function selectCity(cityCode: City) {
    currentCity.value = cityCode
    cookieCity.value = cityCode
  }

  return { currentCity, cities, currentCityName, selectCity }
})
