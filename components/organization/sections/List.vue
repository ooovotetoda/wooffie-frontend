<script setup lang="ts">
import type {Organization, OrganizationList} from "~/types/Organization";
import type {FavoritesList} from "~/types/Favorites";

const config = useRuntimeConfig()
const route = useRoute()
const { user } = useUserStore()

const institutionsCategories = ["clinic", "salon"]

const category = computed(() => route.params.category as string)
const type = computed(() => institutionsCategories.includes(category.value) ? "institutions" : "specialists")

const { data: organizations } = await useAsyncData<Organization[]>(
    `organizations:${type.value}:${route.params.id}`,
    async () => {
      try {
        const response: OrganizationList = await $fetch(`/api/${type.value}/${route.params.id}/connected`, {
          method: "GET",
          baseURL: config.public.baseUrl
        })

        if (response.list) {
          const favorites: FavoritesList = await $fetch(`/api/user/${user.id}/favorites`, {
            method: 'GET',
            baseURL: config.public.baseUrl,
          });

          return response.list.map((org: Organization) => {
            let isFavorite = false

            if (favorites.favorites) {
              isFavorite = favorites.favorites.some((fav: any) => (fav.favorite_type === type.value.slice(0, -1) && fav.id === org.id))
            }

            return {
              ...org,
              isFavorite: isFavorite,
            }
          })
        } else {
          return []
        }
      } catch (e) {
        console.log(e)
        return []
      }
    }
)

</script>

<template>
  <Empty v-if="!organizations" :margin="100"/>

  <ul ref="listRef">
    <li v-for="(item, index) in organizations" :key="index">
      <CatalogCard :organization="item" :maxDescriptionLength="480"/>
    </li>
  </ul>
</template>

<style scoped lang="scss">
ul {
  list-style-type: none;
}
</style>