<script setup lang="ts">
const props = defineProps({
  breadcrumbs: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <nav class="breadcrumbs">
    <ol class="breadcrumbs-list">
      <li
        v-for="(item, index) in breadcrumbs"
        :key="item.name"
        class="breadcrumbs-list-item"
      >
        <NuxtLink v-if="index === 0" :to="item.path">Главная</NuxtLink>
        <NuxtLink v-else :to="item.path">{{ item.name }}</NuxtLink>
      </li>
    </ol>
  </nav>
</template>

<style scoped lang="scss">
.breadcrumbs {
  margin: 39px 0;

  &-list {
    display: flex;
    align-items: center;
    list-style-type: none;

    &-item {
      display: flex;
      align-items: center;
      a {
        color: $dark-grey;
        font-feature-settings: 'clig' off, 'liga' off;
        font-family: Roboto, serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        transition: all 0.1s ease-in-out;

        &:hover {
          color: $main-color;
        }
      }

      &:not(:first-of-type):before {
        content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM4OTg5ODkiIGQ9Ik0xMi42IDEyTDggNy40TDkuNCA2bDYgNmwtNiA2TDggMTYuNmw0LjYtNC42WiIvPjwvc3ZnPg==");
        max-width: 16px;
        max-height: 16px;
        transform: scale(1.25);
        margin: 0 12px;
      }
    }
  }
}
</style>