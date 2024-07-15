<script setup lang="ts">
definePageMeta({
  breadcrumb: 'Несуществующая страница',
})
</script>

<template>
  <main>
    <UContainer>
      <div class="wrapper">
        <h1 class="title">
          Cтраница не существует
        </h1>
        <div class="media">
          <NuxtImg
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
    </UContainer>
  </main>
</template>

<style scoped lang="scss">
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
  color: $text-dark;
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
  background: $main-color;
  color: #FFF;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: $main-color-dark;
  }

  &:active {
    scale: 0.95;
  }
}
</style>
