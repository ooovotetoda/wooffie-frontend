<script setup lang="ts">
const { signOut } = useUserStore()

const route = useRoute()

const path = ref(route.path.split("/"))
const page = ref(path.value[path.value.length - 1])

watch(() => route.path, (newPath) => {
  path.value = newPath.split("/")
  page.value = path.value[path.value.length - 1]
}, { immediate: true })
</script>

<template>
  <nav class="navigation">
    <ul class="navigation__list">
      <NuxtLink to="/profile">
        <li class="navigation__item" :class="{active: page === 'profile'}">
          <div class="navigation__icon">
            <IconsProfile />
          </div>
          <span>Профиль</span>
        </li>
      </NuxtLink>

      <NuxtLink to="/profile/feedback">
        <li class="navigation__item" :class="{active: page === 'feedback'}">
          <div class="navigation__icon">
            <IconsReview />
          </div>
          <span>Мои отзывы</span>
        </li>
      </NuxtLink>

      <NuxtLink to="/profile/favorite">
        <li class="navigation__item" :class="{active: page === 'favorite'}">
          <div class="navigation__icon">
            <IconsFavorite />
          </div>
          <span>Избранное</span>
        </li>
      </NuxtLink>

<!--      <NuxtLink to="/profile/settings">-->
<!--        <li class="navigation__item" :class="{active: page === 'settings'}">-->
<!--          <div class="navigation__icon">-->
<!--            <IconsSettings />-->
<!--          </div>-->
<!--          <span>Настройки</span>-->
<!--        </li>-->
<!--      </NuxtLink>-->

      <NuxtLink  to="/">
        <li @click="signOut" class="navigation__item">
          <div class="navigation__icon">
            <IconsLogout />
          </div>
          <span>Выход</span>
        </li>
      </NuxtLink>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.navigation {
  height: fit-content;
  width: 219px;
  min-width: 219px;

  &__list {
    list-style-type: none;
  }

  &__icon {
    display: flex;
    align-items: center;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.48);
    transition: all 0.1s ease-in-out;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
    transition: all 0.1s ease-in-out;

    &:hover {
      background: #fbfbfb;

      .navigation__icon {
        color: rgba(225, 175, 87, 0.9);
      }
    }

    &.active {
      background: $hover-grey;

      .navigation__icon {
        color: $main-color;
      }
    }
  }
}
</style>