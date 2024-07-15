<script setup lang="ts">
import { formatPhone } from '../../.nuxt/imports'
import { useUserStore } from '~/stores/userStore'
import { useCodeTimer } from '~/composables/useCodeTimer'

definePageMeta({
  layout: 'authorization',
})

const route = useRoute()
const authStorage = useSessionStorage('auth-store', { phone: '+79999999999', password: '' })
const { signUp } = useUserStore()

const phone = authStorage.value.phone

const code = ref < string | null > (null)
const isCodeSent = ref < boolean > (false)
const isCodeValid = ref < boolean > (true)

const { timer, startTimer, resetTimer } = useCodeTimer(isCodeSent)

async function handleSubmit() {
  if (!code.value || code.value.length < 4) {
    isCodeValid.value = false
    return
  }

  const password = authStorage.value.password

  const isValid = await validateOTP(code.value)

  if (isValid) {
    if (route.query.type === 'register') {
      if (!password) {
        return
      }

      await signUp(password)
      await navigateTo('/')
    }
    else if (route.query.type === 'reset') {
      await navigateTo('/auth/newpass')
    }
  }
  else {
    console.warn('code not valid')
  }
}

async function resendCode() {
  if (isCodeSent.value)
    return

  resetTimer()
  startTimer(5900)

  if (phone) {
    await sendOTP(phone)
  }
  else {
    console.error('invalid phone number')
  }
}
</script>

<template>
  <AuthBlock>
    <template #title>
      Одноразовый код
    </template>

    <div class="authorization-hint">
      <IconsQuestion />
      <span>На номер {{ formatPhone(phone) }} отправлен одноразовый код </span>
    </div>

    <form
      class="authorization-form"
      @submit.prevent="handleSubmit"
    >
      <AuthCode
        v-model:isCodeValid="isCodeValid"
        @update-code="(c) => code = c"
      />

      <button class="authorization-login">
        Подтвердить
      </button>
    </form>

    <button
      :disabled="isCodeSent"
      class="authorization-registration"
      @click="resendCode"
    >
      <span v-if="!isCodeSent">Отправить код</span>
      <span v-else>Повторно отправить {{ `0:${timer}` }}</span>
    </button>
  </AuthBlock>
</template>

<style scoped lang="scss">
.authorization {
  text-align: center;

  &-hint {
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
    text-align: left;
    color: $dark-grey;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    transition: all 0.15s ease-in-out;

    span {
      text-decoration: none;
    }
  }

  &-login {
    width: 100%;
    padding: 12px 0;
    margin-bottom: 12px;
    border-radius: 10px;
    border: none;
    background: $main-color;
    color: #FFF;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: $main-color-dark;
    }

    &:active {
      transform: scale(0.95);
    }
  }

  &-registration {
    width: 100%;
    padding: 12px 0;
    border-radius: 10px;
    border: none;
    background: #FFF;
    color: $dark-grey;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: $hover-grey;
    }

    &:active {
      transform: scale(0.95);
    }
  }
}
</style>
