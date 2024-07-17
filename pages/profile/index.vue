<script setup lang="ts">
definePageMeta({
  layout: 'profile',
  breadcrumb: 'Профиль',
})
</script>

<template>
  <section class="profile w-full">
    <div class="profile__media">
      <NuxtImg
        :modifiers="{ grayscale: true, tint: '#CF8802' }"
        format="webp"
        provider="myProvider"
        src="/user-icon.svg"
        alt="user"
      />
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

<style scoped>
.profile {
  min-height: 900px;
}

.profile__media {
  width: 100px;
  height: 100px;
  margin-bottom: 48px;
}

.profile__media img {
  width: 100%;
  height: 100%;
}

.profile__list {
  list-style-type: none;
}

.profile__item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}
</style>

