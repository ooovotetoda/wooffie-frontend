<script setup lang="ts">
definePageMeta({
  breadcrumb: "FAQ"
})
</script>

<template>
  <section class="faq">
    <div class="container">
      <h2 class="faq__title">Часто задаваемые вопросы</h2>
      <div class="wrapper">
        <FaqCard/>
        <FaqCard/>
        <FaqCard/>
        <FaqCard/>
        <FaqCard/>
        <FaqCard/>
        <FaqCard/>
        <FaqCard/>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.faq {
  padding-bottom: 60px;

  &__title {
    margin-bottom: 60px;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}

.wrapper {
  display: grid;
  max-width: 100%;
  grid-auto-rows: 380px;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  grid-auto-flow: row;
  justify-content: space-between;
  justify-items: center;
  gap: 46px;
}
</style>