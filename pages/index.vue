<script setup lang="ts">

</script>

<template>
  <section v-once id="main" class="main-header">
    <div class="container">
      <div class="poster">
        <h1 class="poster-title">Wooffie</h1>
        <p class="poster-description">Заботимся о поиске лучших — для ваших меньших братьев. <br/>Специалисты, которым можно доверять!</p>
      </div>
      <Search/>
    </div>
  </section>

  <section v-once id="services" class="services">
    <div class="container">
      <div class="wrapper">
        <h2 class="services-title">Услуги</h2>
        <div class="services-row">
          <MainServiceCard title="Клиники" service="clinic" image="card-clinic.webp"/>
          <MainServiceCard title="Ветеринары" service="vet" image="card-vet.webp"/>
        </div>
        <div class="services-row">
          <MainServiceCard title="Грумеры" service="groomer" image="card-groomer.webp"/>
          <MainServiceCard title="Зоосалоны" service="salon" image="card-salon.webp"/>
        </div>
      </div>
    </div>
  </section>

  <section v-once id="about" class="about">
    <div class="container">
      <div class="wrapper">
        <div class="about-text">
          <h2 class="about-text-title">
            О нас
          </h2>
          <div class="about-text-description">
            <p>
              Добро пожаловать на Вуффи — вашего надежного помощника в мире услуг для животных. Наша миссия — сделать заботу о ваших питомцах простой, удобной и доступной. В мире, где каждый питомец заслуживает только лучшего, мы предлагаем мостик доверия между владельцами животных и специалистами.
            </p>
            <br>
            <p>
              Созданный с любовью к животным, наш сервис предлагает уникальную платформу для оценки и отзывов о ветеринарах, ветклиниках, зоосалонах, грумерах и других учреждениях, заботящихся о благополучии ваших четвероногих друзей. Мы верим, что каждый отзыв помогает сделать мир лучше для наших маленьких братьев, обеспечивая их здоровье и счастье.
            </p>
          </div>
        </div>
        <div class="about-image">
          <img src="/about-animals.webp" alt="animals"/>
        </div>
      </div>
    </div>
  </section>

  <section class="specialists">
    <div class="container">
      <div class="wrapper">
        <h2 class="specialists-title">Специалисты</h2>
        <MainSpecialistCarousel/>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.main-header {
  padding: 60px 0;
}

.poster {
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

  &-title {
    color: $grey;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 88px;
    font-weight: 500;
    font-variant: all-small-caps;
    user-select: none;
  }

  &-description {
    max-width: 800px;
    color: $grey;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    user-select: none;
  }
}

.services {
  padding: 60px 0 120px 0;
  background: $light-grey;
  text-align: center;

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 60px;
  }

  &-title {
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 56px;
    font-weight: 500;
    font-variant: all-small-caps;
  }

  &-row {
    display: flex;
    gap: 60px;
  }
}

.about {
  padding: 60px 0;
  
  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 60px;
  }

  &-text {
    max-width: 664px;

    &-title {
      margin-bottom: 32px;
      color: $text-dark;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto, serif;
      font-size: 56px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      font-variant: all-small-caps;
    }

    &-description {
      color: $dark-grey;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto, serif;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 30px; /* 166.667% */
    }
  }

  &-image {
    width: 100%;
    text-align: center;
  }
}

.specialists {
  padding: 60px 0;
  background: $light-grey;
  text-align: center;

  &-title {
    margin-bottom: 40px;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 56px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-variant: all-small-caps;
  }
}

@media screen and (max-width: 1440px) {
  .about {
    .wrapper {
     flex-direction: column; 
    }

    &-text {
      max-width: 100%;
    }
  }
}

@media (max-width: 390px) {
  .main {
    &-header {
      padding: 36px 0;
    }
  }
}
</style>