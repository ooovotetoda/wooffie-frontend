<script setup lang="ts">
const { user } = useUserStore()
</script>

<template>
  <div class="user">
    <div class="user-header">
      <div class="user-avatar">
        <NuxtImg
          :modifiers="{ grayscale: true, tint: '#CF8802' }"
          format="webp"
          provider="myProvider"
          src="/user-icon.svg"
          alt="profile"
          width="50"
          height="50"
        />
      </div>

      <div class="user-text">
        <span class="user__role">{{ user.loggedIn ? "Клиент" : "Не авторизован" }}</span>
        <span class="user__number">{{ user.loggedIn ? user.phoneNumber : "Вход не осуществлен" }}</span>
      </div>
    </div>

    <div
      v-if="!user.loggedIn"
      class="user-buttons"
    >
      <NuxtLink to="/auth/signup">
        <button class="user__button signup">
          Регистрация
        </button>
      </NuxtLink>

      <NuxtLink to="/auth/signin">
        <button class="user__button login">
          Вход
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.user {
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.user-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-text {
  display: flex;
  flex-direction: column;
  font-family: Roboto, sans-serif;
}

.user__role {
  color: #000000DE;
  font-size: 16px;
  line-height: 22px;
}

.user__number {
  color: #0000008A;
  font-size: 14px;
  line-height: 19px;
}

.user-buttons {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

.user-buttons a {
  flex: 1;
}

.user__button {
  width: 100%;
  padding: 14px 0;
  border-radius: 10px;
  font-family: Roboto, sans-serif;
  font-size: 14px;
}

.signup {
  border: 1px var(--main-color) solid;
  background: white;
  color: var(--main-color);
}

.login {
  border: 1px var(--main-color) solid;
  background: var(--main-color);
  color: white;
}
</style>

