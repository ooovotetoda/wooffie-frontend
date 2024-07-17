<script setup lang="ts">
import type {Organization} from "~/types/organization";

const {$ofetch} = useNuxtApp()

const {data: specialists} = await useAsyncData<Organization[]>(
    "main:specialists",
    async () => {
      try {
        const response: { specialists: Organization[] } = await $ofetch("api/specialists/top", {
          method: "GET",
          query: {
            limit: 5
          }
        })

        return response.specialists
      } catch (e) {
        console.error(e)
        return []
      }
    }
)
</script>

<template>
  <section
    v-once
    id="main"
    class="main-header"
  >
    <UContainer>
      <div class="poster">
        <h1 class="poster__title">
          Wooffie
        </h1>
        <p class="poster__description">
          Заботимся о поиске лучших — для ваших меньших братьев. <br>Специалисты, которым можно доверять
        </p>
      </div>
      <Search />
    </UContainer>
  </section>

  <section
    v-once
    id="services"
    class="services"
  >
    <UContainer class="px-0">
      <div class="wrapper">
        <h2 class="services__title">
          Услуги
        </h2>

        <MainServicePlaceholder />
      </div>
    </UContainer>
  </section>

  <section
    v-once
    id="about"
    class="about"
  >
    <UContainer>
      <div class="wrapper">
        <div class="about-text">
          <h2 class="about-text__title">
            О нас
          </h2>
          <div class="about-text__description">
            <p>
              Добро пожаловать на Вуффи — вашего надежного помощника в мире услуг для животных. Наша миссия — сделать заботу о ваших питомцах простой, удобной и доступной. В мире, где каждый питомец заслуживает только лучшего, мы предлагаем мостик доверия между владельцами животных и специалистами.
            </p>
            <br>
            <p>
              Созданный с любовью к животным, наш сервис предлагает уникальную платформу для оценки и отзывов о ветеринарах, ветклиниках, зоосалонах, грумерах и других учреждениях, заботящихся о благополучии ваших четвероногих друзей. Мы верим, что каждый отзыв помогает сделать мир лучше для наших маленьких братьев, обеспечивая их здоровье и счастье.
            </p>
          </div>
        </div>
        <div class="about__image">
          <NuxtImg
            :modifiers="{ grayscale: true, tint: '#CF8802' }"
            class="m-auto w-auto sm:w-full lg:w-[956px]"
            format="webp"
            provider="myProvider"
            src="/about-animals.webp"
            alt="animals"
          />
        </div>
      </div>
    </UContainer>
  </section>

  <section class="specialists">
    <div class="wrapper">
      <h2 class="specialists__title">
        Специалисты
      </h2>

      <MainSpecialistSlider :specialists="specialists"/>
    </div>
  </section>
</template>

<style scoped>
.main-header {
  padding: 60px 0;
}

.poster {
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 32px;
  text-align: center;
  background: url("/main-header-bg.webp") no-repeat center;
  background-size: cover;
}

.poster::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 0;
}

.poster__title {
  color: var(--grey);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 88px;
  font-weight: 500;
  font-variant: all-small-caps;
  user-select: none;
  z-index: 1;
}

.poster__description {
  max-width: 800px;
  color: var(--grey);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  user-select: none;
  z-index: 1;
}

.services {
  padding: 60px 0 120px 0;
  background: var(--light-grey);
  text-align: center;
}

.services .wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 60px;
}

.services__title {
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 56px;
  font-weight: 500;
  font-variant: all-small-caps;
}

.about {
  padding: 60px 0;
}

.about .wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 60px;
}

.about-text {
  max-width: 664px;
}

.about-text__title {
  margin-bottom: 32px;
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 56px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-variant: all-small-caps;
}

.about-text__description {
  color: var(--dark-grey);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
}

.about__image {
  width: 100%;
  text-align: center;
}

.specialists {
  padding: 60px 0;
  background: var(--light-grey);
  text-align: center;
}

.specialists .wrapper {
  margin: 0 auto;
  max-width: 1104px;
}

.specialists__title {
  margin-bottom: 40px;
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 56px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-variant: all-small-caps;
}

@media screen and (max-width: 1536px) {
  .about .wrapper {
    flex-direction: column;
  }

  .about-text {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .poster {
    position: relative;
    gap: 0;
  }

  .poster::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0, 0.4);
    z-index: 0;
  }

  .poster__title {
    font-size: 48px;
    line-height: 56px;
    z-index: 1;
  }

  .poster__description {
    max-width: 281px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    z-index: 1;
  }

  .main-header {
    padding: 36px 0;
  }

  .services {
    padding: 32px 0 16px 0;
  }

  .services .wrapper {
    display: block;
  }

  .services__title {
    font-size: 24px;
  }

  .about {
    padding: 32px 0;
  }

  .about .wrapper {
    gap: 24px;
  }

  .about-text__title {
    margin-bottom: 16px;
    font-size: 24px;
    font-weight: 500;
    line-height: 28px;
    text-align: center;
  }

  .about-text__description {
    font-size: 14px;
  }

  .about__image img {
    width: 100%;
  }

  .specialists {
    padding: 32px 0 16px 0;
  }

  .specialists .container {
    margin: 0;
  }

  .specialists__title {
    font-size: 24px;
    margin-bottom: 0;
  }
}
</style>

