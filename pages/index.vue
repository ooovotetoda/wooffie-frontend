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
  <section v-once id="main" class="main-header">
    <div class="container">
      <div class="poster">
        <h1 class="poster-title">wooffie</h1>
        <p class="poster-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
      </div>
      <Search/>
    </div>
  </section>

  <section v-once id="services" class="services">
    <div class="container">
      <div class="wrapper">
        <h2 class="services-title">Наши услуги</h2>
        <div class="services-row">
          <MainServiceCard title="Клиники" service="clinics" image="https://s3-alpha-sig.figma.com/img/1bce/f637/bb9fea3cfbb974c57a82252a91129dc8?Expires=1702252800&Signature=fkJrnkJoJ2LV7cd1G7~qw1jq5H-p3xjdGFIC5Pi5BcKuM4rmZjRn1Ftb2sCyMghtCm4L4Cz5X6dmF4i~Psdl1MF-h4eOl5v1rlFo5~cSrGgtbDpxrgxHEJYxm5tAgMGCCLndjv2H8ewyurDFN4YfodnhSgADBkf6T2d6pZOohE1rkVVjvgJVthXtXCcskRVioozt~ECj1aGzY7rqeZeZ76nq8F5wRY9sZlPdOl-33x-V-kK05aRC3W-uUjjvMFkOQA~rMaBpI8fKTt5K~Mb3Hg4fQJQGZJUYnMhR1M-nt~3F9Ikx5DtHDSagRN~MFgrfBeFHSjYbMIeFcUUYZkbQyw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"/>
          <MainServiceCard title="Ветеринары" service="vets" image="https://s3-alpha-sig.figma.com/img/d298/b493/63442a841effa276b481f0322b98f508?Expires=1702252800&Signature=aT8OZUtyydJ08gmcuJoOcvWncfy0v-9iaHUSf1F2mHn0aJNBYvR-ZVnqkqtq5RaZ8lc-RgC3q2bXKsUwsg0x1NJ2uR8aDbUf7U9Pb0HW0GEdHy6BV2AaNNjy2jKJf~mrkD3uwlAYeYuCchb~YZnTmT8-Sk8-SGxPHxyAsL84PY3Z4m5h~oGxE9p3mGbP2I2Ngo4jwaE6Suc9aydzUkSSgHhwR7gng3tg~eeQo9xOyJX9l6Xn2jw537zzEnzCAZn8f2PUI8qsoGBF9Y15JKM6~E7VQCXgr7iJWqTG6-xI5UKQxIsU2GE8fs7YvNcyDYoRFHz~qEYZisrgm8NOrK9cOw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"/>
        </div>
        <div class="services-row">
          <MainServiceCard title="Грумеры" service="groomers" image="https://s3-alpha-sig.figma.com/img/bf9d/1728/cf993f5b946f86c5dcbfaa4a0f9c1012?Expires=1702252800&Signature=Ob1fCcqxA9-dfQVEHsSjF0m~GXG1yED~k9wFSxGAs7iFNOL2q5wM0Voi1do1W8JWAK49qa15HcMPIgqQsn1ZkB8O-kpWIbiA8RksugZPmjypk5sRVBq7sI0ft80DbrPagU0GdJO0EJ2fB1ZjNUuhLmTn0hfCG-aCkpY42uNEdOpDU3YCuASB1~i5c0g9-QKwfQz0LA9x2Cz~enLNT8gXbSDx5Tjp9V9jM-bAU9RNtoBB0fFRf-v17oloO2Q5PL5QV6HPCisXtx75MwWCp0KqppzsGCTlsXpuD8lDOaoR5N7nKI9nFOqb-hdAlaDvzjqGtTdgtmPJIV74PguKqaODvw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"/>
          <MainServiceCard title="Зоосалоны" service="zoosalons" image="https://s3-alpha-sig.figma.com/img/383d/b5d5/ebbaab24a303c6a858410c17adc60f11?Expires=1702252800&Signature=TjQVjTp9jI77zO9Qz0o7myaS94G0J5yOt7Nyd-BygGGlyO0c578cNZSk5FhXnW4JJG2ZAYnj85ppbXTIvs-63QCnHd3H6IuOYEspAdIOTJqbdJPJXYjOruf7ppff3Gdn77qD98CH6IMPoHyAMArBWB43zvWEZGmDQE-jCnDG~~G1Z99Yx~GhZV78FmM7pnTjiOW0z7-uXWo7byHPbKA1fJ~S85ZOHN4bHvIYCh9RYmOXIsl7pClTh8Api1MGkACBy53lGJwTXN~~ZChU8MFp4r4eY4diKwiHE7xQts-2raNAyP00mWlSSMQVq9p7qZlC9uqyCul4c6qcoWUXN2j7KA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"/>
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
</style>