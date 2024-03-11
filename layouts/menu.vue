<script setup lang="ts">

</script>

<template>
  <div class="menu">
    <MenuHeader />
    <main class="main">
      <div class="container">
        <MenuUser/>

        <slot/>
      </div>
    </main>
  </div>

</template>

<style scoped lang="scss">
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