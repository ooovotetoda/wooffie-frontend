<script setup lang="ts">
import type {Address, Schedule} from "~/types/organization";

const props = defineProps<{
  addresses: Address[],
  schedule: Schedule[],
}>()

const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
const rows = [[0, 1, 2], [3, 4, 5], [6]];
const dates = ref<number[]>([]);

const addrId = props.addresses ? props.addresses[0].id : 0
const address = ref(addrId)

const scheduleFiltered = computed(() => {
  const filtered = props.schedule?.filter((item) => {
    return item ? item.address_id === address.value : false;
  });

  return filtered?.sort((a, b) => {
    return a && b ? a.day_of_week - b.day_of_week : 0;
  });
})

const getDatesForWeek = () => {
  const today = new Date();
  let dayOfWeek = today.getDay();

  dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const currentMonthDay = today.getDate();

  for (let i = 0; i < weekDays.length; i++) {
    const dateOffset = i - dayOfWeek;
    const date = new Date(today);

    date.setDate(currentMonthDay + dateOffset);
    dates.value[i] = date.getDate();
  }
};

const currentMonthName = ref('');

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const setCurrentMonthName = () => {
  const today = new Date();
  const monthName = today.toLocaleString('ru-RU', { month: 'long' });
  currentMonthName.value = capitalizeFirstLetter(monthName);
};

onMounted(() => {
  getDatesForWeek();
  setCurrentMonthName();
});
</script>

<template>
<div class="schedule">
  <h3 class="schedule__title">{{ currentMonthName }}</h3>

  <div class="schedule__row" v-for="(row, rowIndex) in rows" :key="rowIndex">
    <div class="schedule__item" v-for="dayIndex in row" :key="dayIndex">
      <div class="schedule__weekday">{{ weekDays[dayIndex] }}</div>
      <div class="schedule__subitem">
        <span class="schedule__date">{{ dates[dayIndex] }}</span>
        <span class="schedule__time">{{
            scheduleFiltered[dayIndex] ? scheduleFiltered[dayIndex].start_time.slice(0, -3) : ""
          }}-{{ scheduleFiltered[dayIndex] ? scheduleFiltered[dayIndex].end_time.slice(0, -3) : "" }}</span>
      </div>
    </div>
  </div>

  <div class="schedule__street">
    <select name="street" id="street" class="schedule__input" v-model="address">
      <option v-for="address in addresses" :value="address.id">{{ address.address }}</option>
    </select>
  </div>
</div>
</template>

<style scoped lang="scss">
.schedule {
  width: 334px;
  min-width: 334px;
  padding: 32px;
  border-radius: 10px;
  background: #FFF;
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.10);
  text-align: center;

  &__title {
    margin-bottom: 18px;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  &__row {
    display: flex;
    align-items: start;
    margin-bottom: 16px;
  }

  &__item {
    flex: 1;
  }

  &__weekday {
    padding: 4px 32px;
    background: rgba(221, 185, 164, 0.50);
    color: #824C27;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &__subitem {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 8px;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &__street {
    position: relative;
    margin-top: 8px;
    width: 100%;
    
    &:before {
      content: "";
      position: absolute;
      top: -8px;
      right: 0;
      left: 0;
      height: 1px;
      background: #D9DAD9;
    }

    &:after {
      content: "";
      position: absolute;
      top: 50%;
      right: 12px;
      width: 8px;
      height: 4px;
      background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTEyIDE1bC01LTVoMTBsLTUgNVoiLz48L3N2Zz4=") no-repeat center;
      transform: translateY(-50%);
    }
  }

  &__input {
    width: 100%;
    padding: 15px 14px;
    border: none;
    outline: none;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    appearance: none;

    &:hover {
      background-color: $hover-grey;
    }
  }
}
</style>