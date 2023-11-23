<script setup lang="ts">

</script>

<template>
  <div class="filter">
    <h4 class="filter__title">Фильтр по оценкам</h4>

    <ul class="filter__list">
      <ProfileSectionsFeedbackLine label="Отлично" :all="16" :count="5"/>
      <ProfileSectionsFeedbackLine label="Хорошо" :all="16" :count="6"/>
      <ProfileSectionsFeedbackLine label="Нормально" :all="16" :count="1"/>
      <ProfileSectionsFeedbackLine label="Плохо" :all="16" :count="3"/>
      <ProfileSectionsFeedbackLine label="Ужасно" :all="16" :count="1"/>
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