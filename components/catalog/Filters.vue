<script setup lang="ts">
import {useCatalogFiltersStore} from "~/stores/catalogFiltersStore";

const nowId = useId("now")
const roundId = useId("round")

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
}

const resetFilters = async () => {
  filtersStore.resetFilters()
  filters.schedule = null;
  filters.formats.local = false;
  filters.formats.online = false;
  filters.formats.home = false;
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

<style scoped lang="scss">
.filters {
  width: 378px;
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

        label {
          position: relative;
          padding-left: 32px;
          cursor: pointer;
        }
      }
    }

    &-radio {
      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;

        &:checked ~ span {
          background-color: $main-color;
          border: 2px solid $main-color;

          &:after {
            display: block;
          }
        }

        &:checked ~ .filters-category-radio-background {
          background-color: #FFFFFF;
          border: 2px solid $main-color;

          &:after {
            display: block;
          }
        }
      }

      &:hover .filters-category-radio-background {
        background-color: $hover-grey !important; /* или измените другие стили для показа при наведении */
      }

      span {
        position: absolute;
        top: 0;
        left: 0;
        height: 18px;
        width: 18px;
        border-radius: 50%;
        border: 2px solid rgba(0, 0, 0, 0.48);
        transition: all 0.1s ease-in-out;
        z-index: 2;

        &:after {
          content: "";
          position: absolute;
          display: none;
          top: 50%;
          left: 50%;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid white;
          background: $main-color;
          transform: translate(-50%, -50%);
        }
      }

      &-background {
        position: absolute;
        background: #FFFFFF !important;
        border-radius: 50%;
        border: none !important;
        scale: 1.5;
        z-index: 1 !important; /* Убедитесь, что этот фон ниже span */
        transition: all 1s ease-in-out;
      }
    }

    &-checkbox {
      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;

        &:checked ~ span {
          background-color: $main-color;
          border: 2px solid $main-color;

          &:after {
            display: block;
          }
        }

        &:checked ~ .filters-category-checkbox-background {
          background-color: #FFFFFF;
          border: 2px solid $main-color;

          &:after {
            display: block;
          }
        }
      }

      &:hover .filters-category-checkbox-background {
        background-color: $hover-grey !important;
      }

      span {
        position: absolute;
        top: 0;
        left: 0;
        height: 18px;
        width: 18px;
        border-radius: 3px;
        border: 2px solid rgba(0, 0, 0, 0.48);
        transition: all 0.1s ease-in-out;
        z-index: 2;

        &:after {
          content: "";
          position: absolute;
          display: none;
          top: 0;
          left: 50%;
          width: 5px;
          height: 9px;
          border: solid white;
          border-width: 0 2px 2px 0;
          -webkit-transform: translateX(-50%) rotate(45deg);
          -ms-transform: translateX(-50%) rotate(45deg);
          transform: translateX(-50%) rotate(45deg);
        }
      }

      &-background {
        position: absolute;
        background: #FFFFFF;
        border-radius: 4px;
        border: none !important;
        scale: 1.5;
        z-index: 1 !important;
        transition: all 1s ease-in-out;
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

@media (max-width: 1280px) {
  .filters {
    width: 277px;
    min-width: 277px;
    padding: 24px;
  }
}
</style>