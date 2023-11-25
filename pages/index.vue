<script setup lang="ts">
useSeoMeta({
  title: 'Wooffie',
  ogTitle: 'Wooffie',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <section id="main" class="main-header">
    <div class="container">
      <div class="poster">
        <h1 class="poster-title">wooffie</h1>
        <p class="poster-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
      </div>
      <Search/>
    </div>
  </section>

  <section id="services" class="services">
    <div class="container">
      <div class="wrapper">
        <h2 class="services-title">Наши услуги</h2>
        <div class="services-row">
          <MainServiceCard title="Клиники" service="clinics" image="https://s3-alpha-sig.figma.com/img/1bce/f637/bb9fea3cfbb974c57a82252a91129dc8?Expires=1700438400&Signature=Ip02D63geF1~Oe4rCgvYEtA1wZEh27niBcIvZWCiM8BTwR2YnA4t-BGcJwVls35aK4YK2LRSbXEyFF6wydllMeq5k6x2J1XFx9cQabKPHCaFoXSaF6OtDJS4RTwEwo7vPyhuCvQ563xL1eOSckMnbCaLEBT6so7cNAqvd25rmI9jFPZba6FPbLPMlpQRr7HeTTQABjiOCNbibsp2h7OV~JzvJwliw6G6JdUvmbjtvnuY80eSsbQPyPRpaM--WR60Nnh1za1AKBib8ETeUWVeqnFUMiAQyEhNycLNf35T3taYpw6hPH18~RNwdEi7peJ-lnL5aTYILIFdjQL1Xz0Dlg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"/>
          <MainServiceCard title="Ветеринары" service="vets" image="https://s3-alpha-sig.figma.com/img/d298/b493/63442a841effa276b481f0322b98f508?Expires=1700438400&Signature=djjGK8xNVyyiLig6YlX8yOf27Pjy~QOgzj5hIb57xE1iIBILgqyXeZqmdTAhARQsHuGeWYwxzG~W2OAkMRuwfJaje5idxB9PbELTrNZ4vf-~dw4wvY9uSb2~ofIjhTE0FI0VQM3uf3DL2zXMa1jfMWMQkCtyxNle9o0zf2sELUxEE3BlhkL5W7yxALr2nwbPi20cWEETVvSv01XSfaWblOcUZjzPtAnIDU6gWXDpxQJFQYVqZflkueSPtDwuUK7A8OpQbbZPjfgkpddGAPMNRPLF4FdH8uiYQrQrlrAMRYr6ls-xadJEDvzZpOU3QrDoUKREzVVWpFHH02x8vm6omA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"/>
        </div>
        <div class="services-row">
          <MainServiceCard title="Грумеры" service="groomers" image="https://s3-alpha-sig.figma.com/img/bf9d/1728/cf993f5b946f86c5dcbfaa4a0f9c1012?Expires=1700438400&Signature=IBJWYqu-xEzFgMyXmDiZz3tWf2PY7i48UVI5~6h3zhdxLwqkITSHStCke9tT1sKdo7i2PerE7QDRVyPRR2hTk~AR-MU~AoVSL1xj7kKSWW62eN8Tzvl9dIfgGUpo8~2afOnXshDHBJDTQlbI6-pPuABWzEVTwlhUipwgX3RNsqYNYqLhjSv~3fqPFsY6~Je7OCuiviVRaB1ThLWsDGhnVKuNO5~QJ8MZA~PIhfvB8naWdOqwFqFUtd2EIRUoOlBMvOIMqynzWNYqbWyPEmUYYFBUAzxdnLIIq8jT0G3fCbl6ZTW7T3Sh3P0QH4aCkEtuTOPM9vtlfPlhDjQu8sbeFA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"/>
          <MainServiceCard title="Зоосалоны" service="zoosalons" image="https://s3-alpha-sig.figma.com/img/383d/b5d5/ebbaab24a303c6a858410c17adc60f11?Expires=1700438400&Signature=msTi5NsJEh30WYbx9PZiCANZRRkGtJEeEEiJpn51rvGYaOpCEpiTbc70HovDxGe6ZCToGHr9NEJh97ajN7q77ygthpcaM-vHljfBbwHjdiAcFvK4gx949phXYefXQpOP~mIi28Wij1oixwI3fBshwmBYsTbxsvyec3V-uQRvlrSkmHuZAZbuTu742~5eVtmesHLRixsFipjW8CeGRQssD42dPxEA2p9Xv~NeGavy22QSGWuVUCIZGwFa~~3lVCQEYTAqAxBDiJapjknofwQrK6zYzI7HJf-~1pa~2~q7VWMxw7RyupJ2yuUVskMItKDW5gYjsibpuByz64tBTJZCbA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"/>
        </div>
      </div>
    </div>
  </section>

  <section id="about" class="about">
    <div class="container">
      <div class="wrapper">
        <div class="about-text">
          <h2 class="about-text-title">
            О нас
          </h2>
          <p class="about-text-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing.
          </p>
        </div>
        <div class="about-image">
          <img src="/images/about-animals.png" alt="animals">
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
  background: url("/images/main-header-bg.png") no-repeat center;
  background-size: cover;

  &-title {
    color: $grey;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto;
    font-size: 88px;
    font-weight: 500;
    font-variant: all-small-caps;
    user-select: none;
  }

  &-description {
    max-width: 800px;
    color: $grey;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto;
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
    font-family: Roboto;
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
      font-family: Roboto;
      font-size: 56px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      font-variant: all-small-caps;
    }

    &-description {
      color: $dark-grey;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto;
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
    font-family: Roboto;
    font-size: 56px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-variant: all-small-caps;
  }
}
</style>