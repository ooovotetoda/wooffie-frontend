<script setup lang="ts">

</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="wrapper">
        <div class="footer-logo">
          <img src="/images/wooffie-logo.png" alt="logo">
        </div>
        <div class="footer-nav">
          <p class="footer-nav-item">Главная</p>
          <p class="footer-nav-item">О нас</p>
          <p class="footer-nav-item">Наши услуги</p>
          <p class="footer-nav-item">FAQ</p>
        </div>
        <div class="footer-contacts">
          <p class="footer-contacts-item">+7 (555) 888-98-66</p>
          <p class="footer-contacts-item">name@gmail.com</p>
        </div>
        <div class="footer-social">
          <IconsVK/>
          <IconsInstagram/>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
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
    margin: auto;
    width: 100px;
    height: 100px;
    margin-bottom: 16px;
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