<script setup lang="ts">

</script>

<template>
  <main class="main">
    <div class="wrapper">
      <div class="block">
        <NuxtLink to="/">
          <IconsClose/>
        </NuxtLink>

        <slot/>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.main {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("public/authorization-bg.webp") no-repeat center;
  background-size: cover;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.26);
  }
}

.wrapper {
  display: flex;
  justify-content: right;
  align-items: center;
  height: 100%;
  margin: auto;
  padding: 0 200px;
}

.block {
  position: relative;
  width: 430px;
  padding: 56px;
  border-radius: 10px;
  background: var(--t-1100, #FFF);
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.10);
  z-index: 1;

  svg {
    position: absolute;
    top: 26px;
    right: 26px;
    cursor: pointer;
  }

}
</style>
