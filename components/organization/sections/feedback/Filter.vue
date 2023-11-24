<script setup lang="ts">

</script>

<template>
  <div class="filter">
    <h4 class="filter__title">Фильтр по оценкам</h4>

    <ul class="filter__list">
      <OrganizationSectionsFeedbackLine label="Отлично" :all="16" :count="5"/>
      <OrganizationSectionsFeedbackLine label="Хорошо" :all="16" :count="6"/>
      <OrganizationSectionsFeedbackLine label="Нормально" :all="16" :count="1"/>
      <OrganizationSectionsFeedbackLine label="Плохо" :all="16" :count="3"/>
      <OrganizationSectionsFeedbackLine label="Ужасно" :all="16" :count="1"/>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.filter {
  &__title {
    margin-bottom: 24px;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto;
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