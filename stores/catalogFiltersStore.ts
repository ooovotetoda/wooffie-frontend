export const useCatalogFiltersStore = defineStore('catalogFilters', () => {
  const filters: Filters = reactive({
    schedule: null,
    formats: {
      local: false,
      online: false,
      home: false,
    },
  })

  const updateFilters = (newFilters: Filters) => {
    filters.schedule = newFilters.schedule
    filters.formats.local = newFilters.formats.local
    filters.formats.online = newFilters.formats.online
    filters.formats.home = newFilters.formats.home
  }

  const resetFilters = () => {
    filters.schedule = null
    filters.formats.local = false
    filters.formats.online = false
    filters.formats.home = false
  }

  return { filters, updateFilters, resetFilters }
})
