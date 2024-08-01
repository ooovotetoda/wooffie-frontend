<script setup lang="ts">
import {useCatalogFiltersStore} from "~/stores/catalogFiltersStore";
import type { Filters } from "~/types/catalog";

const emit = defineEmits(["close"])

const filtersStore = useCatalogFiltersStore()

const filters: Filters = reactive({
  schedule: filtersStore.filters.schedule,
  formats: {
    local: filtersStore.filters.formats.local,
    online: filtersStore.filters.formats.online,
    home: filtersStore.filters.formats.home,
  },
})

const nowId = useId("now")
const roundId = useId("round")

const sendFilters = async () => {
  filtersStore.updateFilters(filters)

  emit("close")
}

const resetFilters = async () => {
  filtersStore.resetFilters()
  filters.schedule = null;
  filters.formats.local = false;
  filters.formats.online = false;
  filters.formats.home = false;

  emit("close")
}

</script>

<template>
  <aside class="filters">
    <div class="filters-title">
      <IconsFilters/>
      <h3>Фильтры</h3>
    </div>

    <form @submit.prevent="sendFilters" @reset="resetFilters">
      <div class="filters-wrapper">
        <div class="filters-category">
          <h4 class="filters-category-title">
            Категория
          </h4>

          <ul>
            <li>
              <label class="filters-category-radio">Круглосуточно
                <input type="radio" :id="roundId" value="round" v-model="filters.schedule">
                <span></span>
                <span class="filters-category-radio-background"></span>
              </label>
            </li>

            <li>
              <label class="filters-category-radio">Открыто сейчас
                <input type="radio" :id="nowId" value="now" v-model="filters.schedule">
                <span></span>
                <span class="filters-category-radio-background"></span>
              </label>
            </li>
          </ul>
        </div>


        <div class="filters-category">
          <h4 class="filters-category-title">
            Формат приёма
          </h4>
          <ul>
            <li>
              <label class="filters-category-checkbox">В учреждении
                <input type="checkbox" id="check1" value="round" v-model="filters.formats.local">
                <span></span>
                <span class="filters-category-checkbox-background"></span>
              </label>
            </li>

            <li>
              <label class="filters-category-checkbox">Онлайн
                <input type="checkbox" id="check2" value="now" v-model="filters.formats.online">
                <span></span>
                <span class="filters-category-checkbox-background"></span>
              </label>
            </li>

            <li>
              <label class="filters-category-checkbox">На дому
                <input type="checkbox" id="check2" value="now" v-model="filters.formats.home">
                <span></span>
                <span class="filters-category-checkbox-background"></span>
              </label>
            </li>
          </ul>
        </div>

      </div>

      <div class="filters-buttons">
        <button class="filters-buttons__reset" type="reset">Сбросить</button>
        <button class="filters-buttons__apply" type="submit">Применить</button>
      </div>
    </form>
  </aside>
</template>

<style scoped>
.filters {
  width: 378px;
  min-width: 378px;
  height: fit-content;
  padding: 32px;
  margin-bottom: 39px;
  border-radius: 10px;
  background: #FFF;
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.10);
}

.filters-title {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px;
  margin-bottom: 16px;
}

.filters-title h3 {
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.filters-title svg {
  font-size: 24px;
}

.filters-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 16px;
}

.filters-category-title {
  padding: 10px 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid #D9DAD9;
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.filters-category ul {
  padding: 0 12px;
  list-style-type: none;
}

.filters-category ul li {
  padding: 4px;
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}

.filters-category ul li label {
  position: relative;
  padding-left: 32px;
  cursor: pointer;
}

.filters-category-radio input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.filters-category-radio input:checked ~ span {
  background-color: var(--main-color);
  border: 2px solid var(--main-color);
}

.filters-category-radio input:checked ~ span:after {
  display: block;
}

.filters-category-radio input:checked ~ .filters-category-radio-background {
  background-color: #FFFFFF;
  border: 2px solid var(--main-color);
}

.filters-category-radio input:checked ~ .filters-category-radio-background:after {
  display: block;
}

.filters-category-radio:hover .filters-category-radio-background {
  background-color: var(--hover-grey) !important;
}

.filters-category-radio span {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.48);
  transition: all 0.1s ease-in-out;
  z-index: 2;
}

.filters-category-radio span:after {
  content: "";
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 3px solid white;
  background: #CF8802;
  transform: translate(-50%, -50%);
}

.filters-category-radio-background {
  position: absolute;
  background: #FFFFFF !important;
  border-radius: 50%;
  border: none !important;
  transform: scale(1.5);
  z-index: 1 !important;
  transition: all 1s ease-in-out;
}

.filters-category-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.filters-category-checkbox input:checked ~ span {
  background-color: var(--main-color);
  border: 2px solid var(--main-color);
}

.filters-category-checkbox input:checked ~ span:after {
  display: block;
}

.filters-category-checkbox input:checked ~ .filters-category-checkbox-background {
  background-color: #FFFFFF;
  border: 2px solid var(--main-color);
}

.filters-category-checkbox input:checked ~ .filters-category-checkbox-background:after {
  display: block;
}

.filters-category-checkbox:hover .filters-category-checkbox-background {
  background-color: var(--hover-grey) !important;
}

.filters-category-checkbox span {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  border-radius: 3px;
  border: 2px solid rgba(0, 0, 0, 0.48);
  transition: all 0.1s ease-in-out;
  z-index: 2;
}

.filters-category-checkbox span:after {
  content: "";
  position: absolute;
  display: none;
  top: 0;
  left: 50%;
  width: 5px;
  height: 11px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: translateX(-50%) rotate(45deg);
}

.filters-category-checkbox-background {
  position: absolute;
  background: #FFFFFF;
  border-radius: 4px;
  border: none !important;
  transform: scale(1.5);
  z-index: 1 !important;
  transition: all 1s ease-in-out;
}

.filters-buttons {
  width: 100%;
  display: flex;
  gap: 8px;
}

.filters-buttons button {
  flex: 1;
  width: 100%;
  height: 43px;
  border-radius: 10px;
  border: none;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.filters-buttons button:active {
  transform: scale(0.95);
}

.filters-buttons__reset {
  background-color: #fff;
}

.filters-buttons__reset:hover {
  background-color: var(--hover-grey);
}

.filters-buttons__apply {
  color: #FFFFFF;
  background-color: var(--main-color);
}

.filters-buttons__apply:hover {
  background-color: var(--main-color-dark);
}

@media (max-width: 1536px) {
  .filters {
    width: 277px;
    min-width: 277px;
    padding: 24px;
  }
}

@media (max-width: 1280px) {
  .filters {
    width: 100%;
    padding: 0;
    margin: 24px 0 127px 0;
    box-shadow: none;
  }

  .filters-title {
    display: none;
  }

  .filters-buttons {
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: 32px;
    width: auto;
    padding: 16px;
    border-radius: 16px;
    background-color: #fff;
    box-shadow: 2px 2px 20px 0 #0000001A;
    z-index: 10;
  }

  .filters-buttons button {
    height: 39px;
    font-size: 14px;
  }

  .filters-buttons__reset {
    background-color: #F9F9F9;
  }
}

@media (max-width: 640px) {
  .filters-buttons {
    position: fixed;
    left: 20px;
    right: 20px;
    bottom: 32px;
  }
}
</style>
