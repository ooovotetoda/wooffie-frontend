<script setup lang="ts">
import type {Review} from "~/types/reviews";

const props = defineProps<{
  reviews: Review[]
}>()

const emit = defineEmits(['checks'])

const counts = reactive({
  all: props.reviews ? props.reviews.length : 0,
  great: props.reviews ? props.reviews.filter((r: Review) => r.rating === 5).length : 0,
  good: props.reviews ? props.reviews.filter((r: Review) => r.rating === 4).length : 0,
  normal: props.reviews ? props.reviews.filter((r: Review) => r.rating === 3).length : 0,
  bad: props.reviews ? props.reviews.filter((r: Review) => r.rating === 2).length : 0,
  terrible: props.reviews ? props.reviews.filter((r: Review) => r.rating === 1).length : 0,
})

const checked = reactive({
  great: true,
  good: true,
  normal: true,
  bad: true,
  terrible: true,
})

watch(checked, (newChecked) => {
  emit("checks", newChecked)
}, { immediate: true, deep: true })
</script>

<template>
  <div class="filter">
    <h4 class="filter__title">Фильтр по оценкам</h4>

    <ul class="filter__list">
      <OrganizationSectionsFeedbackLine
          label="Отлично"
          :all="counts.all"
          :count="counts.great"
          v-model="checked.great"
      />
      <OrganizationSectionsFeedbackLine
          label="Хорошо"
          :all="counts.all"
          :count="counts.good"
          v-model="checked.good"
      />
      <OrganizationSectionsFeedbackLine
          label="Нормально"
          :all="counts.all"
          :count="counts.normal"
          v-model="checked.normal"
      />
      <OrganizationSectionsFeedbackLine
          label="Плохо"
          :all="counts.all"
          :count="counts.bad"
          v-model="checked.bad"
      />
      <OrganizationSectionsFeedbackLine
          label="Ужасно"
          :all="counts.all"
          :count="counts.terrible"
          v-model="checked.terrible"
      />
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
    line-height: 24px;
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

@media (max-width: 640px) {
  .filter {
    &__title {
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 500;
    }
  }
}
</style>