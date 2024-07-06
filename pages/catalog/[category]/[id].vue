<script setup lang="ts">
import {sections} from "~/utils/constants";
import {useType} from "~/composables/useType";

definePageMeta({
  breadcrumb: "Организация"
})

const { $ofetch } = useNuxtApp()

const route = useRoute()
const router = useRouter()

const { user } = useUserStore()

const type = useType()

const { data: organization } = await useAsyncData(
    `organization:${route.params.id}`,
    async () => {
      try {
        const response: { organization: Organization } = await $ofetch(`/api/${type.value}/${route.params.id}`, {
          method: "GET",
        })

        if (response.organization) {
          if (user.loggedIn) {
            const favorites: FavoritesList = await $ofetch(`/api/user/${user.id}/favorites`, {
              method: 'GET',
            });

            let isFavorite = false
            if (favorites.favorites) {
              isFavorite = favorites.favorites.some((fav: any) => (fav.favorite_type === type.value.slice(0, -1) && fav.id === response.organization.id))
            }

            return {
              ...response.organization,
              isFavorite: isFavorite,
            }
          } else {
            return {
              ...response.organization,
              isFavorite: false,
            }
          }

        }
      } catch (e) {
        console.error(e)
        return {}
      }
    }
)

watch(() => route, () => {
  if (!sections.includes(route.query.section as string)) {
    router.replace({ query: {
        section: "services"
      }
    })
  }
}, { immediate: true })
</script>

<template>
  <main class="main">
    <UContainer>
      <OrganizationHeader :organization/>
      <OrganizationNav />
      <OrganizationSections :organization/>
    </UContainer>
  </main>
</template>

<style scoped lang="scss">

</style>