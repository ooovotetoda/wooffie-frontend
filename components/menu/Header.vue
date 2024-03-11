<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header-wrapper">
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
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  height: 72px;
  padding: 16px 0;
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.10);

  .container {
    width: 100%;
  }

  &-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

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
</style>