<script setup lang="ts">
import sendOTP from '~/utils/sendOTP'

definePageMeta({
  layout: 'authorization',
})

const authStorage = useSessionStorage('auth-store', { phone: '+79999999999', password: '', timer: '00' })

const phone = ref < string | null > (null)
const isPhoneValid = ref < boolean > (true)
const password = ref < string | null > (null)
const isPasswordValid = ref < boolean > (true)

async function handleSubmit() {
  if (phone.value === null
    || password.value === null
    || password.value.length < 8
    || !isPhoneValid.value
    || !isPasswordValid.value) {
    return
  }

  if (phone.value.startsWith('8')) {
    phone.value = phone.value.replace('8', '+7')
  }

  authStorage.value.phone = phone.value
  authStorage.value.password = password.value

  const status = await sendOTP(phone.value)

  if (status === 'OK') {
    await navigateTo({
      path: '/auth/code',
      query: {
        type: 'register',
      },
    })
  }
  else {
    console.log('failed to send OTP code')
  }
}
</script>

<template>
  <AuthBlock>
    <template #title>
      Регистрация
    </template>

    <form class="authorization-form" @submit.prevent="handleSubmit">
      <AuthPhone
        v-model:isPhoneValid="isPhoneValid"
        @update-phone="(p) => phone = p"
      />
      <AuthPassword
        v-model:isPasswordValid="isPasswordValid"
        @update-password="(p) => password = p"
      />

      <button class="authorization-login">
        Зарегистрироваться
      </button>
    </form>

    <NuxtLink to="/auth/signin">
      <button class="authorization-registration">
        Вход
      </button>
    </NuxtLink>
  </AuthBlock>
</template>

<style scoped lang="scss">
.authorization {
  text-align: center;

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
    color: $text-dark;
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

  &-error {
    text-align: left;
    margin: -12px 0 6px 16px;
    color: rgba(228, 0, 0, 0.87);
    font-family: Roboto, serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 171.429% */
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.1s ease-in-out;
  margin: 0;
  padding: 0 14px;
}
.fade-enter-from, .fade-leave-to {
  margin: 0 14px;
  padding: 0;
  opacity: 0;
}
</style>
