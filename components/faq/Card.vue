<script setup lang="ts">

</script>

<template>
    <div v-once class="card">
      <NuxtLink to="/faq/1">
        <div class="card__media">
          <img src="/images/faq-card.jpg" alt="faq">
        </div>
        <div class="card__body">Очень очень длинная формулировка во...</div>
      </NuxtLink>
    </div>
</template>

<style scoped lang="scss">
.card {
  width: 380px;
  height: 380px;
  border-radius: 20px;
  background: #FFF;
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.10);
  transition: all 0.1s ease-in-out;

  &:hover {
    box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.20);
  }

  &__media {
    width: 100%;
    height: 292px;

    img {
      width: 100%;
      height: 100%;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      object-fit: cover;
    }
  }

  &__body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 88px;
    overflow: hidden;
    color: $text-dark;
    text-align: center;
    font-feature-settings: 'clig' off, 'liga' off;
    text-overflow: ellipsis;
    font-family: Roboto, serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
  }
}
</style>