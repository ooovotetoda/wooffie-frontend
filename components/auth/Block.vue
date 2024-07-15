<script setup lang="ts">

</script>

<template>
  <div class="authorization">
    <h3 class="authorization-title">
      <slot name="title" />
    </h3>

    <slot />
  </div>
</template>

<style scoped lang="scss">
.authorization {
  text-align: center;

  &-title {
    margin-bottom: 32px;
    color: $main-color;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
}

@media (max-width: 640px) {
  .authorization {
    &-title {
      margin-bottom: 24px;
    }
  }
}
</style>
