<script setup lang="ts">
import { ref } from 'vue';

import { resolveComponent } from 'vue';

const NuxtLink = resolveComponent('NuxtLink');
const props = defineProps({
  breadcrumbs: {
    type: Array,
    required: true,
  },
});

const dropdownOpened = ref(false);
const close = () => {
  dropdownOpened.value = false;
};
const toggle = () => {
  dropdownOpened.value = !dropdownOpened.value;
};
</script>

<template>
<!--  <nav class="inline-flex items-center text-sm font-normal font-body">-->
<!--    <ol class="flex w-auto leading-none group md:flex-wrap">-->
<!--      <li class="flex items-center sm:hidden text-neutral-500">-->
<!--        <SfDropdown v-model="dropdownOpened" strategy="absolute" placement="bottom-start" @update:model-value="close">-->
<!--          <template #trigger>-->
<!--            <SfButton-->
<!--              class="relative w-5 h-5 !p-0 rounded-sm outline-secondary-600 hover:bg-transparent active:bg-transparent"-->
<!--              aria-label="More breadcrumbs"-->
<!--              type="button"-->
<!--              variant="tertiary"-->
<!--              square-->
<!--              @click="toggle"-->
<!--            >-->
<!--              <template #prefix>-->
<!--                <SfIconMoreHoriz-->
<!--                  size="sm"-->
<!--                  class="text-neutral-500 hover:text-primary-700 active:text-primary-800 active:bg-transparent"-->
<!--                />-->
<!--              </template>-->
<!--            </SfButton>-->
<!--          </template>-->
<!--          <div class="px-4 py-2 rounded-md shadow-md border-neutral-100">-->
<!--            <li v-for="item in breadcrumbs" :key="item.name" class="py-2 last-of-type:hidden">-->
<!--              <SfLink-->
<!--                :href="item.path"-->
<!--                variant="secondary"-->
<!--                :tag="NuxtLink"-->
<!--                class="leading-5 no-underline text-inherit hover:underline active:underline whitespace-nowrap outline-secondary-600"-->
<!--              >-->
<!--                {{ item.name }}-->
<!--              </SfLink>-->
<!--            </li>-->
<!--          </div>-->
<!--        </SfDropdown>-->
<!--      </li>-->
<!--      <li-->
<!--        v-for="(item, index) in breadcrumbs"-->
<!--        :key="item.name"-->
<!--        class="peer hidden sm:flex peer-[:nth-of-type(even)]:before:content-['›'] peer-[:nth-of-type(even)]:before:px-2 peer-[:nth-of-type(even)]:before:leading-5 last-of-type:flex last-of-type:before:font-normal last-of-type:before:text-neutral-500 text-neutral-500 last-of-type:text-neutral-900 last-of-type:font-medium"-->
<!--      >-->
<!--        <SfLink-->
<!--          v-if="index === 0"-->
<!--          :href="item.path"-->
<!--          variant="secondary"-->
<!--          :tag="NuxtLink"-->
<!--          class-name="inline-flex leading-5 no-underline hover:underline active:underline whitespace-nowrap outline-secondary-600 text-neutral-500"-->
<!--        >-->
<!--          <SfIconHome size="sm" />-->
<!--        </SfLink>-->
<!--        <SfLink-->
<!--          v-else-->
<!--          :href="item.path"-->
<!--          variant="secondary"-->
<!--          :tag="NuxtLink"-->
<!--          class="leading-5 no-underline hover:underline active:underline whitespace-nowrap outline-secondary-600 text-inherit"-->
<!--        >-->
<!--          {{ item.name }}-->
<!--        </SfLink>-->
<!--      </li>-->
<!--    </ol>-->
<!--  </nav>-->

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