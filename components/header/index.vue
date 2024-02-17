<script setup lang="ts">
import formatPhone from "~/utils/formatPhone";

const { user } = useUserStore()

const phone = formatPhone(user.phoneNumber)
</script>

<template>
  <header class="header">
    <div class="header-wrapper">
      <div class="container">
        <div class="wrapper">
          <div class="header__left">
            <NuxtLink to="/">
              <div class="header-logo">
                <NuxtImg src="/wooffie-logo__main-color.svg" alt="logo"/>
              </div>
              <span class="header-logo__text">wooffie</span>
            </NuxtLink>

            <HeaderCity />
          </div>
          <div class="header__right">
            <div v-if="user.loggedIn" class="header__user">
              <span>{{ phone }}</span>
              <NuxtLink to="/profile">
                <div class="header__profile">
                  <NuxtImg src="/user-icon.svg" alt="profile"/>
                </div>
              </NuxtLink>
            </div>

            <NuxtLink v-else to="/auth/signin">
              <button class="header-login">Вход</button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: relative;
  height: 92px;

  &-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 20px 0;
    box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.10);
    background: #FFF;
    z-index: 20;
  }


  &__left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 80px;

    a {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  &__right {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  &-logo {
    width: 50px;
    height: 50px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }

    &__text {
      font-family: Roboto, sans-serif;
      font-size: 24px;
      font-weight: 500;
      text-transform: uppercase;
      color: $main-color;
    }
  }

  &-city {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.15s linear;

    span {
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto, sans-serif;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      transition: all 0.1s linear;
    }

    svg {
      transition: all 0.1s linear;
    }

    &:hover {
      span {
        color: $main-color;
      }
      svg {
        color: $main-color;
      }
    }
  }

  &-login {
    padding: 12px 32px;
    border: 2px solid $main-color;
    border-radius: 10px;
    background: $main-color;
    color: #FFF;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    font-variant: all-small-caps;
    cursor: pointer;
    transition: all 0.1s linear;

    &:hover {
      background-color: $main-color-dark;
      border: 2px solid $main-color-dark;
    }

    &:active {
      transform: scale(0.96);
    }
  }

  &__user {
    display: flex;
    align-items: center;
    gap: 16px;

    span {
      color: $text-dark;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto, serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  &__profile {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    cursor: pointer;
    transition: all 0.15s linear;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    &:active {
      transform: scale(0.96);
    }
  }
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>