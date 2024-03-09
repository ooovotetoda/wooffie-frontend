<script setup lang="ts">
import {useUserStore} from "~/stores/userStore";
import {formatPhone} from "#imports";

definePageMeta({
  layout: "authorization",
})

const { signIn } = useUserStore()

const phone = ref<string | null>(null);
const isPhoneValid = ref<boolean>(true);
const password = ref<string | null>(null);
const isPasswordValid = ref<boolean>(true);
const isPasswordWrong = ref<boolean>(false);
const body = computed(() => ({
  phone: phone.value,
  password: password.value
}))

const handleSubmit = async () => {
  if (phone.value === null || !isPhoneValid) {
    isPhoneValid.value = false;
    return
  }

  if (password.value === null || password.value.length < 8 || !isPasswordValid) {
    isPasswordValid.value = false;
    return
  }

  const statusCode = await signIn(body.value)

  if (statusCode === 401 || statusCode === 404) {
    isPasswordWrong.value = true
  }
}
</script>

<template>
  <AuthBlock>
    <template v-slot:title>Авторизация</template>

    <form @submit.prevent="handleSubmit" class="authorization-form">
      <AuthPhone
          @updatePhone="(p) => phone = p"
          v-model:isPhoneValid = isPhoneValid
      />
      <AuthPassword
          @updatePassword="(p) => password = p"
          v-model:isPasswordValid="isPasswordValid"
      />

      <p v-if="isPasswordWrong" class="error">Неверный логин или пароль</p>

      <NuxtLink to="/auth/tel">
        <div class="authorization-recovery-pass">
          <IconsQuestion/>
          <span>Не помню пароль</span>
        </div>
      </NuxtLink>

      <button class="authorization-login">Войти</button>
    </form>

    <NuxtLink to="/auth/signup">
      <button class="authorization-registration">Регистрация</button>
    </NuxtLink>
  </AuthBlock>
</template>

<style scoped lang="scss">
.authorization {
  text-align: center;

  &-recovery-pass {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
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

    &:hover {
      color: $main-color;
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

.error {
  text-align: left;
  margin: -12px 0 6px 16px;
  color: rgba(228, 0, 0, 0.87);
  font-family: Roboto, serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
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