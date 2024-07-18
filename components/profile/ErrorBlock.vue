<script setup lang="ts">
defineProps({
  title: {
    default: 'Что-то пошло не так',
    title: String
  }
})
</script>

<template>
  <div class="wrapper">
    <h1 class="title">
      {{ title }}
    </h1>
    <div class="media">
      <NuxtImg
        :modifiers="{ grayscale: true, tint: '#CF8802' }"
        format="webp"
        provider="myProvider"
        src="/slug.webp"
        alt="Empty"
      />
    </div>
    <NuxtLink
      to="/"
      class="home__btn"
    >
      На главную
    </NuxtLink>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 42px;
}

.title {
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 48px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.home__btn {
  padding: 12px 64px;
  border-radius: 10px;
  background: var(--main-color);
  color: #FFF;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  transition: all 0.1s ease-in-out;
}

.home__btn:hover {
  background-color: var(--main-color-dark);
}

.home__btn:active {
  transform: scale(0.95);
}
</style>
