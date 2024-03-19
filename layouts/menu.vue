<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="menu">
    <MenuHeader>
      <div class="header-left">
        <button class="header__back" @click="router.back()">
          <IconsBack />
        </button>

        <span class="header__text">Меню</span>
      </div>

      <div class="header-right">
        <button class="header__search">
          <IconsSearch />
        </button>
      </div>
    </MenuHeader>

    <main class="main">
      <UContainer>
        <MenuUser/>

        <slot/>
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
}
</style>