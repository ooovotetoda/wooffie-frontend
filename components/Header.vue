<script setup lang="ts">

</script>

<template>
  <header class="header">
    <div class="container">
      <div class="wrapper">
        <div class="header__left">
          <div class="header-logo">
            <img src="/images/wooffie-logo.png" alt="logo">
          </div>
          <div class="header-city">
            <IconsCity/>
            <span>Краснодар</span>
          </div>
        </div>
        <div class="header__right">
<!--          <button class="header-login">Вход</button>-->
          <p class="header-username">Дмитрий Иванов</p>
          <div class="header-userbtn">
            <IconsUser/>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  padding: 20px 0;
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.10);

  &__left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 80px;
  }

  &__right {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  &-logo {
    width: 100px;
    height: 100px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &-city {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.15s linear;

    span {
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto, sans-serif;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      transition: all 0.15s linear;
    }

    svg {
      transition: all 0.15s linear;
    }

    &:hover {
      span {
        color: $main-color;
      }
      svg {
        color: $main-color;
      }
    }
  }

  &-login {
    padding: 12px 32px;
    border: 2px solid $main-color;
    border-radius: 10px;
    background: $main-color;
    color: #FFF;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    font-variant: all-small-caps;
    cursor: pointer;
    transition: all 0.1s linear;

    &:hover {
      background-color: $main-color-dark;
      border: 2px solid $main-color-dark;
    }

    &:active {
      transform: scale(0.90);
    }
  }

  &-username {
    color: var(--t-277, rgba(0, 0, 0, 0.77));
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  &-userbtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 6px;
    background: $main-color;
    cursor: pointer;
    transition: all 0.15s linear;

    &:hover {
      background: $main-color-dark;
    }

    &:active {
      transform: scale(0.9);
    }
  }
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>