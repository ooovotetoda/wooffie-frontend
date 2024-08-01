<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { useCityStore } from "~/stores/cityStore";
import type {City} from "~/types/organization";

const cityStore = useCityStore()

const showDropdown = ref(false)
const dropdownRef = ref(null);

const handleCity = (val: City) => {
  cityStore.selectCity(val)
  showDropdown.value = false
}

onClickOutside(dropdownRef, (event) => {
  showDropdown.value = false;
});
</script>

<template>
  <div class="city">
    <div class="city__current" @click="showDropdown = !showDropdown">
      <IconsLocation/>
      <span>{{ cityStore.currentCityName }}</span>
    </div>

    <div
        v-if="showDropdown"
        class="city__dropdown"
        ref="dropdownRef">
      <ul class="city__list">
        <li
            v-for="(name, val) in cityStore.cities"
            class="city__item"
            :key="val"
            @click="handleCity(val)"
        >{{name}}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.city {
  position: relative;
}

.city__current {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.15s linear;
}

.city__current span {
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  transition: all 0.1s linear;
}

.city__current svg {
  transition: all 0.1s linear;
}

.city__current:hover span {
  color: var(--main-color);
}

.city__current:hover svg {
  color: var(--main-color);
}

.city__dropdown {
  width: 300px;
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  border-radius: 10px;
  background: #FFF;
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.10);
}

.city__list {
  list-style-type: none;
}

.city__item {
  padding: 14px 36px;
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}

.city__item:hover {
  background: var(--hover-grey);
}

.city__item:first-of-type {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.city__item:last-of-type {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

@media (max-width: 640px) {
  .city__current span {
    font-size: 16px;
  }

  .city__dropdown {
    width: 250px;
    left: auto;
    right: 0;
    font-size: 16px;
  }

  .city__item {
    padding: 16px 24px;
  }
}
</style>
