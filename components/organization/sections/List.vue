<script setup lang="ts">
interface Favorites {
  favorites: Array<Object>
}

const config = useRuntimeConfig()

const route = useRoute()
const router = useRouter()

const { user } = useUserStore()

const institutionsCategories = ["clinic", "salon"]

const category = computed(() => route.params.category as string)
const type = computed(() => institutionsCategories.includes(category.value) ? "institutions" : "specialists")

const { data, pending, error, refresh } = await useAsyncData(
    `user:${route.params.id}`,
    async () => {
      const response = await $fetch(`/api/${type.value}/${route.params.id}/connected`, {
        method: "GET",
        baseURL: config.public.baseUrl
      })

      if (response?.list) {
        const favorites: Favorites = await $fetch(`/api/user/${user.id}/favorites`, {
          method: 'GET',
          baseURL: config.public.baseUrl,
        });

        return response.list.map((org: Object) => {
          let isFavorite = false
          if (favorites.favorites) {
            isFavorite = favorites.favorites.some((fav: any) => (fav.favorite_type === type.value.slice(0, -1) && fav.id === org.id))
          }

          return {
            ...org,
            isFavorite: isFavorite,
          }
        })
      }
    }
)

</script>

<template>
  <ul ref="listRef">
    <li v-for="(item, index) in data" :key="index">
      <CatalogCard :organization="item" :maxDescriptionLength="480"/>
    </li>
  </ul>
</template>

<style scoped lang="scss">
ul {
  list-style-type: none;
}
</style>