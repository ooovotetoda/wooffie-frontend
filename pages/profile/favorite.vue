<script setup lang="ts">
import type {Favorite, FavoritesList} from "~/types/favorites";

definePageMeta({
  layout: "profile",
  breadcrumb: "Избранное",
})

const { $ofetch } = useNuxtApp()

const { user } = useUserStore()

const { data: favorites, pending } = await useAsyncData<Favorite[]>(
    "profile:favorites",
    async () => {
      try {
        const response: FavoritesList = await $ofetch(`/api/user/${user.id}/favorites`, {
          method: "GET",
        })

        return response.favorites ? response.favorites.map((fav: Favorite) => {
          return {
            ...fav,
            isFavorite: true,
          }
        }) : []
      } catch (e) {
        console.log(e)
        return []
      }
    }
)
</script>

<template>
  <section class="favorite">
    <div v-if="pending" class="loader">
      <Loader />
    </div>
    <div v-else-if="favorites?.length === 0" class="empty">
      <Empty />
    </div>
    <ul v-else>
      <li v-for="(favorite, index) in favorites" :key="index">
        <ProfileFavoriteCard :organization="favorite"/>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.favorite {
  width: 100%;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 128px 0 540px 0;
  min-width: 100%;
}

.empty {
  margin-bottom: 100px;
}

ul {
  list-style-type: none;
}
</style>