<script setup lang="ts">
import getDay from "~/utils/getDay";
import type {Organization, OrganizationList, Schedule} from "~/types/organization";
import type {Favorite, FavoritesList} from "~/types/favorites";

definePageMeta({
  layout: "main",
  breadcrumb: "Каталог"
})

useSeoMeta({
  title: 'Wooffie • Каталог'
})

const { $ofetch } = useNuxtApp()

const route = useRoute()
const cityStore = useCityStore()
const catalogFilters = useCatalogFiltersStore()
const { user } = useUserStore()

const institutionsCategories = ["clinic", "salon"]
const category = computed(() => route.params.category as string)

const type = computed(() => institutionsCategories.includes(category.value) ? "institutions" : "specialists")
const page = ref(0)
const pending = ref(false);

const organizations = ref<Organization[]>([])
onMounted( async () => {
  await loadOrganizations();
})

const filteredOrganizations = computed(() => {
  if (organizations.value) {
    return organizations.value
        .filter((organization) => organization.type === category.value)
        .filter((organization) => organization.city === cityStore.currentCity)
        .filter((organization) => {
          if (catalogFilters.filters.schedule === "now") {
            return organization.schedule.some((schedule: Schedule) => {
              const today = getDay()

              return (schedule.day_of_week === today && isTimeBetween(schedule.start_time, schedule.end_time))
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

  try {
    const response: OrganizationList = await $ofetch(`/api/${type.value}`, {
      method: 'GET',
      query: {
        limit: 20,
        offset: 20 * page.value,
      },
    });

    if (response.list) {
      if (user.loggedIn) {
        try {
          const favorites: FavoritesList = await $ofetch(`/api/user/${user.id}/favorites`, {
            method: 'GET',
          });

          const updatedOrganizations = response.list.map((org: Organization) => {
            let isFavorite = false
            if (favorites.favorites) {
              isFavorite = favorites.favorites.some((fav: Favorite) => (fav.favorite_type === type.value.slice(0, -1) && fav.id === org.id))
            }

            return {
              ...org,
              isFavorite: isFavorite,
            }
          });

          appendOrganizations(updatedOrganizations);

        } catch (e) {
          console.error(e)
        }
    } else {
      const updatedOrganizations = response.list.map((org: Organization) => {
        return {
          ...org,
          isFavorite: false,
        }
      });

      appendOrganizations(updatedOrganizations);
      }
    }
  } catch (e) {
    console.error(e)
  }

  pending.value = false;
};

const appendOrganizations = ( newOrganizations: Organization[] ) => {
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

        <Empty v-else-if="filteredOrganizations.length === 0" :margin="78"/>
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