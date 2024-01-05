export const useCityStore = defineStore('city', () => {
    const currentCity = ref('krd');
    const cities = reactive({
        krd: 'Краснодар',
        msk: 'Москва',
        rnd: 'Ростов-на-Дону',
        spb: 'Санкт-Петербург',
    });

    const currentCityName = computed(() => cities[currentCity.value as keyof typeof cities])

    function selectCity(cityCode: string) {
        currentCity.value = cityCode;
    }

    return { currentCity, cities, currentCityName, selectCity };
});
