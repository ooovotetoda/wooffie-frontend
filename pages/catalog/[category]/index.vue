<script setup lang="ts">
definePageMeta({
  layout: "main",
  breadcrumb: "Каталог"
})

useSeoMeta({
  title: 'Wooffie • Каталог'
})

const config = useRuntimeConfig()
const route = useRoute()

const institutionsCategories = ["clinic", "salon"]
const personnelCategories = ["vet", "groomer"]

const category = computed(() => route.params.category as string)
const type = computed(() => institutionsCategories.includes(category.value) ? "institutions" : "personnel")

const page = ref(0)
const pending = ref(false);
const organizations = ref<Array<Object>>([])
const filteredOrganizations = computed(() => {
  if (organizations.value) {
    return organizations.value
        .filter((organization) => organization.type === category.value)
  }

  return []
})

onMounted(() => {
  loadOrganizations();
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