<script setup lang="ts">
import type {Service} from "~/types/organization";

defineProps<{
  services: Service[]
}>()

</script>

<template>
  <ul class="services__list">
    <li v-for="service in services" class="services__item">
      <div class="services__left">
        <div class="services__icon">
          <NuxtImg format="webp" :src="service.image_url" alt="icon"/>
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

<style scoped>
.services__list {
  margin-bottom: 60px;
  list-style-type: none;
}

.services__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  margin-bottom: 32px;
  border-radius: 20px;
  background: #FFF;
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.10);
  transition: all 0.1s ease-in-out;
}

.services__item:last-of-type {
  margin-bottom: 0;
}

.services__item:hover {
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.20);
}

.services__left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.services__right {
  display: flex;
  align-items: center;
  gap: 48px;
}

.services__icon img {
  width: 36px;
  height: 36px;
}

.services__name {
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}

.services__price {
  color: var(--dark-grey);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.services__btn {
  padding: 12px 50px;
  border-radius: 10px;
  background: var(--main-color);
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
}

.services__btn:hover {
  background: var(--main-color-dark);
}

.services__btn:active {
  transform: scale(0.98);
}

@media (max-width: 640px) {
  .services__list {
    margin-bottom: 32px;
  }

  .services__item {
    padding: 20px 24px;
    margin-bottom: 8px;
  }

  .services__left {
    gap: 8px;
  }

  .services__icon img {
    width: 24px;
    height: 24px;
  }

  .services__name {
    font-size: 14px;
  }

  .services__price {
    font-size: 16px;
  }
}
</style>

