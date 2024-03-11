<script setup lang="ts">
definePageMeta({
  layout: "menu",
  layoutTransition: {
    name: 'slide-in'
  }
})
</script>

<template>
  <ul class="menu__list">
    <li class="menu__item">
      <NuxtLink to="/">
        <span class="list__text">Главная</span>
        <NuxtImg src="https://api.iconify.design/material-symbols:home.svg?color=%23c57e00"/>
      </NuxtLink>
    </li>
    <li class="menu__item">
      <NuxtLink to="/profile">
        <span class="list__text">Профиль</span>
        <NuxtImg src="https://api.iconify.design/material-symbols:account-circle.svg?color=%23c57e00"/>
      </NuxtLink>
    </li>
    <li class="menu__item">
      <NuxtLink to="/catalog/clinic">
        <span class="list__text">Клиники</span>
        <NuxtImg src="https://api.iconify.design/material-symbols:medical-information.svg?color=%23c57e00"/>
      </NuxtLink>
    </li>
    <li class="menu__item">
      <NuxtLink to="/catalog/vet">
        <span class="list__text">Ветеринары</span>
        <NuxtImg src="https://api.iconify.design/material-symbols:id-card.svg?color=%23c57e00"/>
      </NuxtLink>
    </li>
    <li class="menu__item">
      <NuxtLink to="/catalog/groomer">
        <span class="list__text">Грумеры</span>
        <NuxtImg src="https://api.iconify.design/material-symbols:pets.svg?color=%23c57e00"/>
      </NuxtLink>
    </li>
    <li class="menu__item">
      <NuxtLink to="/catalog/salon">
        <span class="list__text">Зоосалоны</span>
        <NuxtImg src="https://api.iconify.design/material-symbols:apartment.svg?color=%23c57e00"/>
      </NuxtLink>
    </li>
    <li class="menu__item">
      <NuxtLink to="/faq">
        <span class="list__text">FAQ</span>
        <NuxtImg src="https://api.iconify.design/material-symbols:import-contacts.svg?color=%23c57e00"/>
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.menu {
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