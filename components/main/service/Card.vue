<script setup lang="ts">
const props = defineProps({
  title: {
    required: true,
    type: String
  },
  service: String,
  image: String,
})
</script>

<template>
  <div class="card">
    <div class="card-image">
      <img :src="image" alt="services" srcset="">
    </div>
    <div class="card-content">
      <div class="card-content-title">
        <span>{{ title }}</span>
        <span>10</span>
      </div>

      <div class="card-content-option">
        <span>Клиника</span>
        <span>10</span>
      </div>
      <div class="card-content-option">
        <span>Клиника</span>
        <span>10</span>
      </div>
      <div class="card-content-option">
        <span>Клиника</span>
        <span>10</span>
      </div>
      <div class="card-content-option">
        <span>Клиника</span>
        <span>10</span>
      </div>
      <div class="card-content-option">
        <span>Клиника</span>
        <span>10</span>
      </div>

      <NuxtLink :to="`/catalog/${service}`">
        <div class="card-content-btn">Все {{ title.toLowerCase() }}</div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  width: 480px;
  height: 337px;
  margin: auto;
  border-radius: 20px;
  background: var(--t-1100, #FFF);
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.10);

  &-image {
    position: relative;
    width: 50%;
    height: 100%;
    &:before {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.2);
      border-bottom-left-radius: 20px;
      border-top-left-radius: 20px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-bottom-left-radius: 20px;
      border-top-left-radius: 20px;
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 240px;
    padding: 32px;

    &-title {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding-bottom: 10px;
      margin-bottom: 18px;
      color: $text-dark;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto, serif;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      border-bottom: 1px solid var(--Line, #D9DAD9);
      //cursor: pointer;
    }

    &-option {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 8px;
      color: $dark-grey;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto, serif;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      cursor: pointer;

      &:nth-last-child(2) {
        margin-bottom: 32px;
      }
    }

    a {
      width: 100%;
    }

    &-btn {
      width: 100%;
      padding: 12px;
      border-radius: 10px;
      background: $main-color;
      color: #FFF;
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
}
</style>