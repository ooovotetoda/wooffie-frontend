<script setup lang="ts">
import getYearWord from "../../../utils/getYearWord";
import type {Organization} from "~/types/organization";

const props = defineProps<{
  specialist: Organization;
}>()

</script>

<template>
  <div class="card">
    <div class="card-avatar">
      <NuxtImg format="webp" :src="specialist.photo" alt="avatar"/>
    </div>
    <p class="card-experience">
      стаж {{ specialist.experience }} {{ getYearWord(specialist.experience) }}
    </p>
    <div class="card-text">
      <div class="card-row">
        <span>Специалист</span>
        {{ specialist.name }}
      </div>
      <div class="card-row">
        <span>Направление</span>
        {{ specialist.profession }}
      </div>
    </div>
    <NuxtLink :to="`/catalog/${specialist.type}/${specialist.id}`">
      <button class="card-btn">Записаться</button>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 420px;
  padding: 32px 72px;
  border-radius: 20px;
  background: #FFF;
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.10);

  &-avatar {
    width: 200px;
    height: 200px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  &-experience {
    margin: 10px 0;
    color: $dark-grey;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  &-text {
    margin-bottom: 24px;
  }

  &-row {
    margin-bottom: 14px;
    margin-right: auto;
    text-align: left;
    color: #080606;
    font-family: "Futura New Book",serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;

    span {
      display: block;
      margin-bottom: 4px;
      color: $dark-grey;
      font-family: "Futura New Book",serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
    }
    &:nth-last-of-type(1) {
      margin-bottom: 0;
    }
  }

  a {
    width: 100%;
  }

  &-btn {
    width: 100%;
    padding: 12px 0;
    border-radius: 10px;
    background: $main-color;
    border: none;
    outline: none;
    color: #FFF;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
    transition: all 0.15s linear;

    &:hover {
      background-color: $main-color-dark;
    }

    &:active {
      transform: scale(0.93);
    }
  }
}

@media (max-width: 414px) {
  .card {
    padding: 32px 40px;

    &-avatar {
      width: 150px;
      height: 150px;
    }

    &-experience {
      margin: 8px 0;
      font-size: 14px;
    }

    &-text {
      align-items: center;
    }

    &-row {
      margin-bottom: 8px;
      font-size: 16px;

      span {
        margin-bottom: 0;
        font-size: 14px;
      }
    }

    &-btn {
      width: 200px;
      font-size: 14px;
    }
  }
}
</style>