<script setup lang="ts">
definePageMeta({
  layout: 'authorization',
})

const {
  phone,
  isPhoneValid,
  password,
  isPasswordValid,
  handleSubmit
} = useSignUp()
</script>

<template>
  <AuthBlock>
    <template #title>
      Регистрация
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

<style scoped>
.authorization {
  text-align: center;
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
