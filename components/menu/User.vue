<script setup lang="ts">
const {user} = useUserStore()
</script>

<template>
  <div class="user">
    <div class="user-header">
      <div class="user-avatar">
        <NuxtImg
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

    <div v-if="!user.loggedIn" class="user-buttons">
      <NuxtLink to="/auth/signup">
        <button class="user__button signup">Регистрация</button>
      </NuxtLink>

      <NuxtLink to="/auth/signin">
        <button class="user__button login">Вход</button>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user {
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0,0,0, 0.04);

  &-header {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &-text {
    display: flex;
    flex-direction: column;
    font-family: Roboto, sans-serif;
  }

  &__role {
    color: #000000DE;
    font-size: 16px;
    line-height: 22px;
  }

  &__number {
    color: #0000008A;
    font-size: 14px;
    line-height: 19px;
  }

  &-buttons {
    display: flex;
    gap: 16px;
    margin-top: 16px;

    a {
      flex: 1;
    }
  }

  &__button {
    width: 100%;
    padding: 14px 0;
    border-radius: 10px;
    font-family: Roboto, sans-serif;
    font-size: 14px;
  }

  .signup {
    border: 1px $main-color solid;
    background: white;
    color: $main-color;
  }

  .login {
    border: 1px $main-color solid;
    background: $main-color;
    color: white;
  }
}
</style>