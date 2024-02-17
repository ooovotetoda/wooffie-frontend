<script setup lang="ts">
import type {Service} from "~/types/organization";

const props = defineProps<{
  services: Service[]
}>()

</script>

<template>
  <ul class="services__list">
    <li v-for="service in services" class="services__item">
      <div class="services__left">
        <div class="services__icon">
          <img :src="service.image_url" alt="icon"/>
        </div>
        <span class="services__name">{{ service.service_name }}</span>
      </div>

      <div class="services__right">
        <span class="services__price">{{ service.price }} ₽</span>
<!--        <button class="services__btn">Записаться</button>-->
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.services {
  &__list {
    margin-bottom: 60px;
    list-style-type: none;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 32px;
    margin-bottom: 32px;
    border-radius: 20px;
    background: #FFF;
    box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.10);
    transition: all 0.1s ease-in-out;

    &:last-of-type {
      margin-bottom: 0;
    }

    &:hover {
      box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.20);
    }
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 48px;
  }

  &__icon {
    img {
      width: 36px;
      height: 36px;
    }
  }

  &__name {
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 133.333% */
  }

  &__price {
    color: $dark-grey;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &__btn {
    padding: 12px 50px;
    border-radius: 10px;
    background: $main-color;
    border: none;
    color: #FFF;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
    transition: all 0.1s ease-in-out;

    &:hover {
      background: $main-color-dark;
    }

    &:active {
      scale: 0.98;
    }
  }
}
</style>