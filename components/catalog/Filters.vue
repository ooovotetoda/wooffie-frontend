<script setup lang="ts">
const route = useRoute()
const router = useRouter()

interface Schedule {
  round: boolean;
  now: boolean;
}

interface Filters {
  category: string | null;
  sort: string | null;
  schedule: Schedule;
}

const filters: Filters = reactive({
  category: null,
  sort: null,
  schedule: {
    round: false,
    now: false,
  },
})

const sendFilters = () => {
  const query: Record<string, string> = {};

  if (filters.category) {
    query.category = filters.category;
  }
  if (filters.sort) {
    query.sort = filters.sort;
  }
  if (filters.schedule.round) {
    query['schedule[round]'] = 'true';
  }
  if (filters.schedule.now) {
    query['schedule[now]'] = 'true';
  }

  router.replace({ query });
}


const resetFilters = () => {
  router.replace({query: {}})
}

watch(() => route, (newRoute) => {
  const categoryValue = Array.isArray(newRoute.query.category)
    ? newRoute.query.category[0]
    : newRoute.query.category;
  filters.category = categoryValue || null;

  const sortValue = Array.isArray(newRoute.query.sort)
    ? newRoute.query.sort[0]
    : newRoute.query.sort;
  filters.sort = sortValue || null;

  const scheduleNowValue = Array.isArray(route.query['schedule[now]'])
    ? route.query['schedule[now]'][0]
    : route.query['schedule[now]'];
  filters.schedule.now = scheduleNowValue === 'true';

  const scheduleRoundValue = Array.isArray(route.query['schedule[round]'])
    ? route.query['schedule[round]'][0]
    : route.query['schedule[round]'];
  filters.schedule.round = scheduleRoundValue === 'true';

}, {immediate: true})
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
              <label class="filters-category-radio">Все
                <input type="radio" id="category1" value="all" v-model="filters.category">
                <span></span>
                <span class="filters-category-radio-background"></span>
              </label>
            </li>

            <li>
              <label class="filters-category-radio">Компания
                <input type="radio" id="category2" value="corporate" v-model="filters.category">
                <span></span>
                <span class="filters-category-radio-background"></span>
              </label>
            </li>

            <li>
              <label class="filters-category-radio">Частные
                <input type="radio" id="category3" value="private" v-model="filters.category">
                <span></span>
                <span class="filters-category-radio-background"></span>
              </label>
            </li>
          </ul>
        </div>

        <div class="filters-category">
          <h4 class="filters-category-title">
            График работы
          </h4>
          <ul>
            <li>
              <label class="filters-category-checkbox">Круглосуточно
                <input type="checkbox" id="check1" value="round" v-model="filters.schedule.round">
                <span></span>
                <span class="filters-category-checkbox-background"></span>
              </label>
            </li>

            <li>
              <label class="filters-category-checkbox">Открыто сейчас
                <input type="checkbox" id="check2" value="now" v-model="filters.schedule.now">
                <span></span>
                <span class="filters-category-checkbox-background"></span>
              </label>
            </li>
          </ul>
        </div>

        <div class="filters-category">
          <h4 class="filters-category-title">
            Сортировка
          </h4>

          <ul>
            <li>
              <label class="filters-category-radio">По умолчанию
                <input type="radio" id="sort1" value="default" v-model="filters.sort">
                <span></span>
                <span class="filters-category-radio-background"></span>
              </label>
            </li>

            <li>
              <label class="filters-category-radio">Дешевле
                <input type="radio" id="sort2" value="cheaper" v-model="filters.sort">
                <span></span>
                <span class="filters-category-radio-background"></span>
              </label>
            </li>

            <li>
              <label class="filters-category-radio">Дороже
                <input type="radio" id="sort3" value="dearer" v-model="filters.sort">
                <span></span>
                <span class="filters-category-radio-background"></span>
              </label>
            </li>

            <li>
              <label class="filters-category-radio">По удаленности
                <input type="radio" id="sort4" value="remoteness" v-model="filters.sort">
                <span></span>
                <span class="filters-category-radio-background"></span>
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
      padding: 12px 32px;
      border-radius: 10px;
      border: none;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto, serif;
      font-size: 18px;
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
</style>