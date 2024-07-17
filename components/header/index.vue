<script setup lang="ts">
import formatPhone from '~/utils/formatPhone'

const { user } = useUserStore()

const phone = formatPhone(user.phoneNumber)

const isOpen = ref(false)
</script>

<template>
  <header class="header">
    <div class="header-wrapper">
      <UContainer>
        <div class="wrapper">
          <div class="header__left">
            <NuxtLink to="/">
              <div class="header-logo">
                <NuxtImg
                  :modifiers="{ grayscale: true, tint: '#CF8802' }"
                  format="webp"
                  provider="myProvider"
                  src="/wooffie-logo__main-color.svg"
                  alt="logo"
                />
              </div>
              <span class="header-logo__text">wooffie</span>
            </NuxtLink>

            <HeaderCity class="hidden sm:block" />
          </div>

          <div class="header__right">
            <div class="header-menu__button">
              <IconsWidgets @click="isOpen = true" />
            </div>

            <USlideover v-model="isOpen">
              <Menu @close="() => isOpen = false" />
            </USlideover>

            <div
              v-if="user.loggedIn"
              class="header__user"
            >
              <span>{{ phone }}</span>
              <NuxtLink to="/profile">
                <div class="header__profile">
                  <NuxtImg
                    :modifiers="{ grayscale: true, tint: '#CF8802' }"
                    format="webp"
                    provider="myProvider"
                    src="/user-icon.svg"
                    alt="profile"
                  />
                </div>
              </NuxtLink>
            </div>

            <NuxtLink
              v-else
              to="/auth/signin"
            >
              <button class="header__login">
                Вход
              </button>
            </NuxtLink>
          </div>
        </div>
      </UContainer>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: relative;
  height: 92px;
  max-width: 100vw;
}

.header-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px 0;
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.10);
  background: #FFF;
  z-index: 20;
}

.header__left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 80px;
}

.header__left a {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header__right {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.header-logo {
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.header-logo img {
  width: 100%;
  height: 100%;
}

.header-logo__text {
  font-family: Roboto, sans-serif;
  font-size: 24px;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--main-color);
}

.header-menu__button {
  display: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--main-color);
  font-size: 16px;
  color: white;
  border: none;
}

.header__login {
  padding: 12px 32px;
  border: 2px solid var(--main-color);
  border-radius: 10px;
  background: var(--main-color);
  color: #FFF;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  font-variant: all-small-caps;
  cursor: pointer;
  transition: all 0.1s linear;
}

.header__login:hover {
  background-color: var(--main-color-dark);
  border: 2px solid var(--main-color-dark);
}

.header__login:active {
  transform: scale(0.96);
}

.header__user {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header__user span {
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.header__profile {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: all 0.15s linear;
}

.header__profile img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.header__profile:active {
  transform: scale(0.96);
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 640px) {
  .header {
    height: 72px;
  }

  .header-wrapper {
    position: static;
    padding: 16px 0;
  }

  .header-logo {
    width: 40px;
    height: 40px;
  }

  .header__right {
    display: block;
  }

  .header__user {
    display: none;
  }

  .header__login {
    display: none;
  }

  .header-menu__button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

