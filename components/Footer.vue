<script setup lang="ts">

</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="wrapper">
        <div class="footer-logo">
          <img src="/images/wooffie-logo__white.svg" alt="logo">
        </div>

        <div class="footer-nav">
          <NuxtLink to="/"><p class="footer-nav-item">Главная</p></NuxtLink>
          <NuxtLink to="/"><p class="footer-nav-item">О нас</p></NuxtLink>
          <NuxtLink to="/"><p class="footer-nav-item">Наши услуги</p></NuxtLink>
          <NuxtLink to="/"><p class="footer-nav-item">FAQ</p></NuxtLink>
        </div>

        <div class="footer-contacts">
          <p class="footer-contacts-item">+7 (555) 888-98-66</p>
          <p class="footer-contacts-item">name@gmail.com</p>
        </div>
        <div class="footer-social">
          <a href="https://vk.com" target="_blank"><IconsVK/></a>
          <a href="https://instagram.com" target="_blank"><IconsInstagram/></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  position: relative;
  padding: 60px 0;
  text-align: center;
  background: #2C2E2A;
  color: $light-grey;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &-logo {
    position: absolute;
    top: 60px;
    left: 200px;
    width: 50px;
    height: 50px;
    //margin-bottom: 16px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 80px ;
    margin-bottom: 40px;
    a p {
      color: rgba(255, 255, 255, 0.87);
      transition: all 0.1s ease-in-out;

      &:hover {
        color: #FFFFFF;
      }
    }
  }

  &-contacts {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px ;
    margin-bottom: 24px;
  }

  &-social {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;

    svg {
      cursor: pointer;
      opacity: 0.87;
      transition: all 0.15s linear;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>