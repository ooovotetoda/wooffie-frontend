<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<template>
  <div class="menu">
    <MenuHeader>
      <div class="header-left">
        <button class="header__back" @click="emit('close')">
          <IconsBack />
        </button>

        <span class="header__text">Меню</span>
      </div>

      <div class="header-right flex items-center gap-4">
        <HeaderCity />

        <button class="header__search">
          <IconsSearch />
        </button>
      </div>
    </MenuHeader>

    <main class="main">
      <UContainer>
        <MenuUser />

        <ul class="menu__list">
          <li class="menu__item" @click="emit('close')">
            <NuxtLink to="/">
              <span class="list__text">Главная</span>
              <NuxtImg src="https://api.iconify.design/material-symbols:home.svg?color=%23c57e00" />
            </NuxtLink>
          </li>
          <li class="menu__item" @click="emit('close')">
            <NuxtLink to="/profile">
              <span class="list__text">Профиль</span>
              <NuxtImg src="https://api.iconify.design/material-symbols:account-circle.svg?color=%23c57e00" />
            </NuxtLink>
          </li>
          <li class="menu__item" @click="emit('close')">
            <NuxtLink to="/catalog/clinic">
              <span class="list__text">Клиники</span>
              <NuxtImg src="https://api.iconify.design/material-symbols:medical-information.svg?color=%23c57e00" />
            </NuxtLink>
          </li>
          <li class="menu__item" @click="emit('close')">
            <NuxtLink to="/catalog/vet">
              <span class="list__text">Ветеринары</span>
              <NuxtImg src="https://api.iconify.design/material-symbols:id-card.svg?color=%23c57e00" />
            </NuxtLink>
          </li>
          <li class="menu__item" @click="emit('close')">
            <NuxtLink to="/catalog/groomer">
              <span class="list__text">Грумеры</span>
              <NuxtImg src="https://api.iconify.design/material-symbols:pets.svg?color=%23c57e00" />
            </NuxtLink>
          </li>
          <li class="menu__item" @click="emit('close')">
            <NuxtLink to="/catalog/salon">
              <span class="list__text">Зоосалоны</span>
              <NuxtImg src="https://api.iconify.design/material-symbols:apartment.svg?color=%23c57e00" />
            </NuxtLink>
          </li>
          <li class="menu__item" @click="emit('close')">
            <NuxtLink to="/faq">
              <span class="list__text">FAQ</span>
              <NuxtImg src="https://api.iconify.design/material-symbols:import-contacts.svg?color=%23c57e00" />
            </NuxtLink>
          </li>
        </ul>
      </UContainer>
    </main>
  </div>
</template>

<style scoped lang="scss">
.header {
  &-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__back {
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.54);
  }

  &__text {
    font-family: Roboto, sans-serif;
    font-size: 16px;
  }

  &__search {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 8px;
    background: #F9F9F9;
    font-size: 14px;
  }
}

.main {
  margin: 32px 0;
}

.menu {
  background: white;
  z-index: 100;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &__list {
    margin-top: 20px;
    list-style: none;
  }

  &__item {
    margin-bottom: 12px;

    a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 17px 24px;
      border-radius: 10px;
      box-shadow: 2px 2px 20px 0 #0000000F;
      font-family: Roboto, sans-serif;
      font-size: 14px;
      line-height: 16px;
      color: #000000DE;
    }

    img {
      width: 16px;
    }
  }
}
</style>
