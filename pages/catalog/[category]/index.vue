<script setup lang="ts">
import getDay from "~/utils/getDay";

definePageMeta({
  layout: "main",
  breadcrumb: "Каталог"
})

useSeoMeta({
  title: 'Wooffie • Каталог'
})

interface Favorites {
  favorites: Array<Object>
}

const config = useRuntimeConfig()

const { user } = useUserStore()
const cityStore = useCityStore()

const route = useRoute()
const institutionsCategories = ["clinic", "salon"]

const category = computed(() => route.params.category as string)
const type = computed(() => institutionsCategories.includes(category.value) ? "institutions" : "specialists")

const page = ref(0)
const pending = ref(false);
const organizations = ref<Array<Object>>([])

onMounted( async () => {
  await loadOrganizations();
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
              const today = getDay()

              return (item.day_of_week === today && isTimeBetween(item.start_time, item.end_time))
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

const loadMore = async () => {
  page.value = page.value + 1;
  await loadOrganizations();
}

const loadOrganizations = async () => {
  pending.value = true;

  const response = await $fetch(`/api/${type.value}`, {
    method: 'GET',
    baseURL: config.public.baseUrl,
    query: {
      limit: 20,
      offset: 20 * page.value,
    },
  });

  if (response?.list) {
    const favorites: Favorites = await $fetch(`/api/user/${user.id}/favorites`, {
      method: 'GET',
      baseURL: config.public.baseUrl,
    });

    const updatedOrganizations = response.list.map((org: Object) => {
      let isFavorite = false
      if (favorites.favorites) {
        isFavorite = favorites.favorites.some((fav: any) => (fav.favorite_type === type.value.slice(0, -1) && fav.id === org.id))
      }

      return {
      ...org,
      isFavorite: isFavorite,
     }
    });

    appendOrganizations(updatedOrganizations); // Обновляем список организаций
  }

  pending.value = false;
};

const appendOrganizations = ( newOrganizations: Array<Object> ) => {
  organizations.value.push(...newOrganizations)
}
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