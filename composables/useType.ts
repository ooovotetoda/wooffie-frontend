import { institutionsCategories } from '~/utils/constants'

export function useType() {
  const route = useRoute()

  const category = computed(() => route.params.category as string)
  const type = computed(() => institutionsCategories.includes(category.value) ? 'institutions' : 'specialists')

  return { category, type }
}
