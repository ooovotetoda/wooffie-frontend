<script setup lang="ts">

</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header-wrapper">
        <slot/>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: relative;
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
}
</style>