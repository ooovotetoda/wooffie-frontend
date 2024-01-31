<script setup lang="ts">
const props = defineProps({
  reviews: Object,
})

const counts = reactive({
  all: props.reviews ? props.reviews.length : 0,
  great: props.reviews ? props.reviews.filter((r: object) => r.rating === 5).length : 0,
  good: props.reviews ? props.reviews.filter((r: object) => r.rating === 4).length : 0,
  normal: props.reviews ? props.reviews.filter((r: object) => r.rating === 3).length : 0,
  bad: props.reviews ? props.reviews.filter((r: object) => r.rating === 2).length : 0,
  terrible: props.reviews ? props.reviews.filter((r: object) => r.rating === 1).length : 0,
})

</script>

<template>
  <div class="filter">
    <h4 class="filter__title">Фильтр по оценкам</h4>

    <ul class="filter__list">
      <OrganizationSectionsFeedbackLine label="Отлично" :all="counts.all" :count="counts.great"/>
      <OrganizationSectionsFeedbackLine label="Хорошо" :all="counts.all" :count="counts.good"/>
      <OrganizationSectionsFeedbackLine label="Нормально" :all="counts.all" :count="counts.normal"/>
      <OrganizationSectionsFeedbackLine label="Плохо" :all="counts.all" :count="counts.bad"/>
      <OrganizationSectionsFeedbackLine label="Ужасно" :all="counts.all" :count="counts.terrible"/>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.filter {
  &__title {
    margin-bottom: 24px;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 120% */
  }

  &__list {
    list-style-type: none;

    li {
      margin-bottom: 16px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }

}
</style>