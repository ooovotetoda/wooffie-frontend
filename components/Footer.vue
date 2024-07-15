<script setup lang="ts">

</script>

<template>
  <footer
    v-once
    class="footer"
  >
    <UContainer>
      <div class="wrapper">
        <div class="footer-logo">
          <NuxtImg
            format="webp"
            provider="myProvider"
            src="/wooffie-logo__white.svg"
            alt="logo"
          />
          <span class="footer-logo__text">wooffie</span>
        </div>

        <div class="footer-nav">
          <NuxtLink :to="{ path: '/', hash: '#main' }">
            <p class="footer-nav-item">
              Главная
            </p>
          </NuxtLink>
          <NuxtLink :to="{ path: '/', hash: '#about' }">
            <p class="footer-nav-item">
              О нас
            </p>
          </NuxtLink>
          <NuxtLink :to="{ path: '/', hash: '#services' }">
            <p class="footer-nav-item">
              Наши услуги
            </p>
          </NuxtLink>
          <NuxtLink to="/faq">
            <p class="footer-nav-item">
              FAQ
            </p>
          </NuxtLink>
        </div>

        <div class="footer-contacts">
          <p class="footer-contacts-item">
            +7 (918) 038-43-08
          </p>
          <p class="footer-contacts-item">
            wooffie@mail.ru
          </p>
        </div>
        <div class="footer-social">
          <a
            href="https://vk.com"
            target="_blank"
          ><IconsVK /></a>
          <a
            href="https://instagram.com"
            target="_blank"
          ><IconsInstagram /></a>
        </div>
      </div>
    </UContainer>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding: 60px 0;
  text-align: center;
  background: #2C2E2A;
  color: $light-grey;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 0 auto 40px auto;

    img {
      width: 50px;
      height: 50px;
    }

    &__text {
      font-family: Roboto, sans-serif;
      font-size: 24px;
      font-weight: 500;
      text-transform: uppercase;
      color: #FFFFFF;
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

@media (max-width: 640px) {
  .footer {
    &-logo {
      margin-bottom: 24px;
    }

    &-nav {
      margin-bottom: 24px;
      gap: 38px;
      font-size: 14px;
    }

    &-contacts {
      font-size: 14px;
    }

    &-social {
      font-size: 24px;
    }
  }
}
</style>
