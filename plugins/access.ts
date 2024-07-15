import { useUserStore } from '~/stores/userStore'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { verifyAccess } = useUserStore()

  await verifyAccess()
})
