<script setup lang="ts">
import { useSignIn } from '~/composables/useSignIn'

definePageMeta({
  layout: 'authorization',
})

const {
  phone,
  isPhoneValid,
  password,
  isPasswordValid,
  isPasswordWrong,
  handleSubmit,
} = useSignIn()
</script>

<template>
  <AuthBlock>
    <template #title>
      Авторизация
    </template>

    <form
      class="authorization-form"
      @submit.prevent="handleSubmit"
    >
      <AuthPhone
        v-model:isPhoneValid="isPhoneValid"
        @update-phone="(p) => phone = p"
      />
      <AuthPassword
        v-model:isPasswordValid="isPasswordValid"
        @update-password="(p) => password = p"
      />

      <p
        v-if="isPasswordWrong"
        class="error"
      >
        Неверный логин или пароль
      </p>

      <NuxtLink to="/auth/tel">
        <div class="authorization-recovery-pass">
          <IconsQuestion />
          <span>Не помню пароль</span>
        </div>
      </NuxtLink>

      <button class="authorization-login">
        Войти
      </button>
    </form>

    <NuxtLink to="/auth/signup">
      <button class="authorization-registration">
        Регистрация
      </button>
    </NuxtLink>
  </AuthBlock>
</template>

<style scoped>
.authorization {
  text-align: center;
}

.authorization-recovery-pass {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  color: var(--dark-grey);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  transition: all 0.15s ease-in-out;
}

.authorization-recovery-pass span {
  text-decoration: none;
}

.authorization-recovery-pass:hover {
  color: var(--main-color);
}

.authorization-login {
  width: 100%;
  padding: 12px 0;
  margin-bottom: 12px;
  border-radius: 10px;
  border: none;
  background: var(--main-color);
  color: #FFF;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.authorization-login:hover {
  background: var(--main-color-dark);
}

.authorization-login:active {
  transform: scale(0.95);
}

.authorization-registration {
  width: 100%;
  padding: 12px 0;
  border-radius: 10px;
  border: none;
  background: #FFF;
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.authorization-registration:hover {
  background: var(--hover-grey);
}

.authorization-registration:active {
  transform: scale(0.95);
}

.authorization-error {
  text-align: left;
  margin: -12px 0 6px 16px;
  color: rgba(228, 0, 0, 0.87);
  font-family: Roboto, serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}

.error {
  text-align: left;
  margin: -12px 0 6px 16px;
  color: rgba(228, 0, 0, 0.87);
  font-family: Roboto, serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
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
