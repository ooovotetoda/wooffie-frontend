<script setup lang="ts">
import type {Breadcrumb} from "~/types/breadcrumbs";

const props = defineProps<{
  breadcrumbs: Breadcrumb[],
}>();

const route = useRoute()

const withFilter = ["/catalog/vet", "/catalog/clinic", "/catalog/salon", "/catalog/groomer"]
</script>

<template>
  <nav class="breadcrumbs">
    <ol class="breadcrumbs-list">
      <li
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="breadcrumb.name"
        class="breadcrumbs-list__item"
      >
        <NuxtLink v-if="index === 0" :to="breadcrumb.path">Главная</NuxtLink>
        <NuxtLink v-else :to="breadcrumb.path">{{ breadcrumb.name }}</NuxtLink>
      </li>
    </ol>

    <NuxtLink v-if="withFilter.includes(route.path)" to="/catalog/filters" class="breadcrumbs-filters__btn">
      <IconsFilters/>
    </NuxtLink>

  </nav>
</template>

<style scoped lang="scss">
.breadcrumbs {
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 39px 0;

  &-list {
    display: flex;
    align-items: center;
    list-style-type: none;

    &__item {
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
        max-height: 20px;
        transform: scale(1.25);
        margin: 0 12px;
      }
    }
  }

  &-filters {
    &__btn {
      display: none;
      padding: 9px;
      border-radius: 8px;
      background: #F9F9F9;
      font-size: 14px;
    }
  }
}

@media (max-width: 414px) {
  .breadcrumbs {
    justify-content: space-between;
    margin: 32px 0 16px 0;

    &-list {
      &__item {
        a {
          font-size: 12px;
        }

        &:not(:first-of-type):before {
          max-width: 16px;
          max-height: 16px;
          transform: scale(1);
          margin: 0 12px;
        }
      }
    }

    &-filters {
      &__btn {
        display: block;
      }
    }
  }
}
</style>