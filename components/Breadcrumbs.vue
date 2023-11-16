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
      a {
        color: $dark-grey;
        font-feature-settings: 'clig' off, 'liga' off;
        font-family: Roboto;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        transition: all 0.1s ease-in-out;

        &:hover {
          color: $main-color;
        }
      }

      &:nth-of-type(even):before {
        content: '›';
        margin: 0 12px;
        color: $dark-grey;
        text-align: center;
        font-feature-settings: 'clig' off, 'liga' off;
        font-family: Material Icons;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 133.333% */
      }
    }
  }
}
</style>