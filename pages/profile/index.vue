<script setup lang="ts">
definePageMeta({
  layout: "profile",
  breadcrumb: "Профиль"
})
</script>

<template>
  <section class="profile">
    <div class="profile__media">
      NuxtImg src="/images/user-icon.svg" alt="user"/>
    </div>
    <ul class="profile__list">
      <li class="profile__item">
        <ProfileMainPhone />
      </li>

      <li class="profile__item">
        <ProfileMainPassword />
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.profile {
  min-height: 900px;

  &__media {
    width: 100px;
    height: 100px;
    margin-bottom: 48px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__list {
    list-style-type: none;
  }

  &__item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 32px;
  }
}
</style>