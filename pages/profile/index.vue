<script setup lang="ts">
definePageMeta({
  layout: "profile",
  breadcrumb: "Профиль"
})

//TODO: тут добавить основную инфу
</script>

<template>
  <section class="profile">
    <div class="profile__media">
      <img src="/images/user-icon.svg" alt="user">
    </div>
    <ul class="profile__list">
      <li class="profile__item">
        <label for="tel" class="profile__label">Телефон</label>
        <input type="tel" name="tel" id="tel">
        <button class="profile__btn">Изменить</button>
      </li>
      <li class="profile__item">
        <label for="tel" class="profile__label">Пароль</label>
        <input type="password" name="password" id="password">
        <button class="profile__btn">Изменить</button>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.profile {
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
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
  }

  &__label {
    display: block;
    width: 148px;
    min-width: 148px;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &__btn {
    padding: 12px 32px;
    border-radius: 10px;
    border: none;
    background: #FFFFFF;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
    transition: all 0.15s ease-in-out;

    &:hover {
      background: $hover-grey;
    }
  }
}
</style>