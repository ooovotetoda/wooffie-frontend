<script setup lang="ts">
import type {Organization, OrganizationList} from "~/types/organization";
import type {FavoritesList} from "~/types/favorites";
import {useType} from "~/composables/useType";

const { $ofetch } = useNuxtApp()
const route = useRoute()
const { user } = useUserStore()

const type = useType()

const { data: organizations } = await useAsyncData<Organization[]>(
    `organizations:${type.value}:${route.params.id}`,
    async () => {
      try {
        const response: OrganizationList = await $ofetch(`/api/${type.value}/${route.params.id}/connected`, {
          method: "GET",
        })

        if (response.list) {
          if (user.loggedIn) {
            const favorites: FavoritesList = await $ofetch(`/api/user/${user.id}/favorites`, {
              method: 'GET',
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
            return response.list.map((org: Organization) => {
              return {
                ...org,
                isFavorite: false,
              }
            })
          }
        } else {
          return []
        }
      } catch (e) {
        console.error(e)
        return []
      }
    }
)

</script>

<template>
  <Empty v-if="organizations?.length === 0" :margin="100"/>

  <ul ref="listRef">
    <li v-for="(item, index) in organizations" :key="index">
      <CatalogCard :organization="item" />
    </li>
  </ul>
</template>

<style scoped lang="scss">
ul {
  list-style-type: none;
}
</style>