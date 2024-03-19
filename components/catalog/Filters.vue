<script setup lang="ts">
import {useCatalogFiltersStore} from "~/stores/catalogFiltersStore";

const router = useRouter()
const {width} = useWindowSize()

const filtersStore = useCatalogFiltersStore()

const filters: Filters = reactive({
  schedule: filtersStore.filters.schedule,
  formats: {
    local: filtersStore.filters.formats.local,
    online: filtersStore.filters.formats.online,
    home: filtersStore.filters.formats.home,
  },
})

const sendFilters = async () => {
  filtersStore.updateFilters(filters)

  if (width.value <= 414) {
    router.back()
  }
}

const resetFilters = async () => {
  filtersStore.resetFilters()
  filters.schedule = null;
  filters.formats.local = false;
  filters.formats.online = false;
  filters.formats.home = false;

  if (width.value <= 414) {
    router.back()
  }
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
              <URadio class="items-center" v-model="filters.schedule" value="round">
                <template #label>
                  <span class="text-base font-normal font-roboto">Круглосуточно</span>
                </template>
              </URadio>
            </li>

            <li>
              <URadio class="items-center" v-model="filters.schedule" value="now">
                <template #label>
                  <span class="text-base font-normal font-roboto">Открыто сейчас</span>
                </template>
              </URadio>
            </li>
          </ul>


        </div>


        <div class="filters-category">
          <h4 class="filters-category-title">
            Формат приёма
          </h4>
          <ul>
            <li>
              <UCheckbox class="items-center" v-model="filters.formats.local" name="round">
                <template #label>
                  <span class="text-base font-normal font-roboto">В учреждении</span>
                </template>
              </UCheckbox>
            </li>

            <li>
              <UCheckbox class="items-center" v-model="filters.formats.online" name="online">
                <template #label>
                  <span class="text-base font-normal font-roboto">Онлайн</span>
                </template>
              </UCheckbox>
            </li>

            <li>
              <UCheckbox class="items-center" v-model="filters.formats.home" name="home">
                <template #label>
                  <span class="text-base font-normal font-roboto">На дому</span>
                </template>
              </UCheckbox>
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

<style scoped lang="scss">
.filters {
  width: 378px;
  min-width: 378px;
  height: fit-content;
  padding: 32px;
  margin-bottom: 39px;
  border-radius: 10px;
  background: #FFF;
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.10);

  &-title {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 12px;
    margin-bottom: 16px;

    h3 {
      color: $text-dark;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto, serif;
      font-size: 24px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    svg {
      font-size: 24px;
    }
  }

  &-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 16px;
  }

  &-category {
    &-title {
      padding: 10px 16px;
      margin-bottom: 16px;
      border-bottom: 1px solid #D9DAD9;
      color: $text-dark;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto, serif;
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    ul {
      padding: 0 12px;
      list-style-type: none;

      li {
        padding: 4px;
        color: $text-dark;
        font-feature-settings: 'clig' off, 'liga' off;
        font-family: Roboto, serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 150% */
      }
    }
  }

  &-buttons {
    width: 100%;
    display: flex;
    gap: 8px;

    button {
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

      &:active {
        transform: scale(0.95);
      }
    }

    &__reset {
      background-color: #fff;

      &:hover {
        background-color: $hover-grey;
      }
    }

    &__apply {
      color: #FFFFFF;
      background-color: $main-color;

      &:hover {
        background-color: $main-color-dark;
      }
    }
  }
}

@media (max-width: 1440px) {
  .filters {
    width: 277px;
    min-width: 277px;
    padding: 24px;
  }
}

@media (max-width: 414px) {
  .filters {
    display: none;

    &-title {
      display: none;
    }

    &-buttons {
      position: fixed;
      left: 20px;
      right: 20px;
      bottom: 32px;
      width: auto;
      padding: 16px;
      border-radius: 16px;
      background-color: #fff;
      box-shadow: 2px 2px 20px 0 #0000001A;
      z-index: 10;

      button {
        height: 39px;
        font-size: 14px;
      }

      &__reset {
        background-color: #F9F9F9;
      }
    }
  }
}
</style>