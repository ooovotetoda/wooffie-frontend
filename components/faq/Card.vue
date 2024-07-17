<script setup lang="ts">

</script>

<template>
  <div
    v-once
    class="card"
  >
    <NuxtLink to="/faq/1">
      <div class="card__media">
        <NuxtImg
          :modifiers="{ grayscale: true, tint: '#CF8802' }"
          format="webp"
          provider="myProvider"
          src="/faq-card.jpg"
          alt="faq"
        />
      </div>
      <div class="card__body">
        Очень очень длинная формулировка во...
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  height: 380px;
  border-radius: 20px;
  background: #FFF;
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.10);
  transition: all 0.1s ease-in-out;
}

.card:hover {
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.20);
}

.card__media {
  width: 100%;
  height: 292px;
}

.card__media img {
  width: 100%;
  height: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  object-fit: cover;
}

.card__body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 88px;
  overflow: hidden;
  color: var(--text-dark);
  text-align: center;
  font-feature-settings: 'clig' off, 'liga' off;
  text-overflow: ellipsis;
  font-family: Roboto, serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}
</style>
