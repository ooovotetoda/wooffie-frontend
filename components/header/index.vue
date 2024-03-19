<script setup lang="ts">
import formatPhone from "~/utils/formatPhone";

const { user } = useUserStore()

const phone = formatPhone(user.phoneNumber)
</script>

<template>
  <header class="header">
    <div class="header-wrapper">
      <UContainer>
        <div class="wrapper">
          <div class="header__left">
            <NuxtLink to="/">
              <div class="header-logo">
                <NuxtImg format="webp" provider="myProvider" src="/wooffie-logo__main-color.svg" alt="logo"/>
              </div>
              <span class="header-logo__text">wooffie</span>
            </NuxtLink>

            <HeaderCity />
          </div>
          
          <div class="header__right">
            <NuxtLink to="/menu" class="header-menu__button">
              <IconsWidgets />
            </NuxtLink>
            
            <div v-if="user.loggedIn" class="header__user">
              <span>{{ phone }}</span>
              <NuxtLink to="/profile">
                <div class="header__profile">
                  <NuxtImg format="webp" provider="myProvider" src="/user-icon.svg" alt="profile"/>
                </div>
              </NuxtLink>
            </div>

            <NuxtLink v-else to="/auth/signin">
              <button class="header__login">Вход</button>
            </NuxtLink>
          </div>
        </div>
      </UContainer>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: relative;
  height: 92px;
  max-width: 100vw;

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

  &-menu {
    &__button {
      display: none;
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: $main-color;
      font-size: 16px;
      color: white;
      border: none;
    }
  }

  &__login {
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

@media (max-width: 414px) {
  .header {
    height: 72px;

    &-wrapper {
      position: static;
      padding: 16px 0;
    }

    &-logo {
      width: 40px;
      height: 40px;
    }
    &__right {
      display: block;
    }
    
    &__user {
      display: none;
    }

    &__login {
      display: none;
    }
    
    &-menu {
      &__button {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>