<script setup lang="ts">
definePageMeta({
  layout: "main",
  breadcrumb: "Каталог"
})

useSeoMeta({
  title: 'Wooffie • Каталог'
})

const cityStore = useCityStore()

const config = useRuntimeConfig()
const route = useRoute()

const institutionsCategories = ["clinic", "salon"]
const personnelCategories = ["vet", "groomer"]

const category = computed(() => route.params.category as string)
const type = computed(() => institutionsCategories.includes(category.value) ? "institutions" : "specialists")

const page = ref(0)
const pending = ref(false);
const organizations = ref<Array<Object>>([])

onMounted(() => {
  loadOrganizations();
})

const catalogFilters = useCatalogFiltersStore()

const filteredOrganizations = computed(() => {
  if (organizations.value) {
    return organizations.value
        .filter((organization) => organization.type === category.value)
        .filter((organization) => organization.city === cityStore.currentCity)
        .filter((organization) => {
          if (catalogFilters.filters.schedule === "now") {
            return organization.schedule.some((item: Object) => {
              let today = new Date();
              let day = today.getDay();
              let dayOfWeek = (day + 6) % 7;

              return (item.day_of_week === dayOfWeek && isTimeBetween(item.start_time, item.end_time))
            })
          } else if (catalogFilters.filters.schedule === "round") {
            return organization.round_clock
          } else {
            return true
          }
        })
        .filter((organization) => {
          if (catalogFilters.filters.formats.local || catalogFilters.filters.formats.online || catalogFilters.filters.formats.home) {
            return (
              (catalogFilters.filters.formats.local && organization.local) ||
              (catalogFilters.filters.formats.online && organization.online) ||
              (catalogFilters.filters.formats.home && organization.on_home)
            )
          } else {
            return true
          }
        })
  }

  return []
})

const loadMore = () => {
  page.value = page.value + 1;
  loadOrganizations();
}

const loadOrganizations = () => {
  pending.value = true;

  $fetch(`/api/${type.value}`, {
    method: 'GET',
    baseURL: config.public.baseUrl,
    query: {
      limit: 20,
      offset: 20 * page.value
    }
  }).then( function( organizations ){
    if (organizations?.list) {
      appendOrganizations( organizations.list );
    }
    pending.value = false;
  });
}

const appendOrganizations = ( newOrganizations: Array<Object> ) => {
  organizations.value.push(...newOrganizations)
}

watch(() => cityStore.currentCity, () => {
  page.value = 0
  organizations.value = []
  loadOrganizations()
})
</script>

<template>
  <div class="container">
    <div class="wrapper">
      <CatalogFilters />
      <main class="main catalog">
        <CatalogNav />
        <CatalogList
            :list="filteredOrganizations"
            @loadMore="loadMore"
        />
        <div v-if="pending" class="catalog__loader">
          <Loader/>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  gap: 60px;
}

.catalog {
  width: 100%;
  
  &__loader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
  }
}

</style>