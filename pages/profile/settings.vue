<script setup lang="ts">
definePageMeta({
  layout: "profile",
  breadcrumb: "Настройки",
  noBreadcrumb: true,
})
</script>

<template>
  <section class="settings">
    <ul class="settings__list">
      <li class="settings__item">
        <label for="tel">Телефон</label>
        <input type="tel" name="tel" id="tel">
        <button class="settings__btn">Изменить</button>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">

</style>