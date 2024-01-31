<script setup lang="ts">
const props = defineProps({
  organization: Object
})

const route = useRoute()
const config = useRuntimeConfig()
const { user } = useUserStore()

const institutionsCategories = ["clinic", "salon"]

const category = computed(() => route.params.category as string)
const type = computed(() => institutionsCategories.includes(category.value) ? "institutions" : "specialists")

const { data, pending, error, refresh } = await useAsyncData(
    `reviews:${route.params.id}`,
    () => $fetch(`/api/reviews/${type.value}`, {
      method: "POST",
      baseURL: config.public.baseUrl,
      body: {
        user_id: user.id,
        organization_id: props.organization?.id
      }
    })
)

const sort = ref<"new" | "old">("new")

const handleNew = () => {
  sort.value = "new"
}

const handleOld = () => {
  sort.value = "old"
}
</script>

<template>
  <button @click="console.log(data)">click</button>
  <div class="feedback__header">
    <div class="feedback__info">
      <h3 class="feedback__title">
        Отзывы о ветклинике «{{ organization.name }}» <span>(4)</span>
      </h3>

      <div class="feedback__rating">
        <span>Рейтинг {{ organization.rating }}</span>
        <Rating :rating="Math.round(organization.rating)" />
      </div>

      <p class="feedback__sort">
        <span class="sort__text">Сортировать:</span>
        <button @click="handleNew" class="sort__item" :class="{active: sort === 'new'}">новые</button>
        <button @click="handleOld" class="sort__item" :class="{active: sort === 'old'}">старые</button>
      </p>
    </div>

    <OrganizationSectionsFeedbackFilter />
  </div>

  <ul class="feedback-comments">
    <li v-for="review in data.reviews">
      <OrganizationSectionsFeedbackComment :review="review" @react="refresh"/>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.feedback {
  &__header {
    display: flex;
    gap: 164px;
    margin-bottom: 24px;
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__title {
    margin-bottom: 32px;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    span {
      color: rgba(0, 0, 0, 0.48);
    }
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 24px;
    font-size: 24px;

    span {
      margin-top: 6px;
      color: $text-dark;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto, serif;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  &__sort {
    margin-top: auto;
    .sort {
      &__text {
        margin-right: 16px;
        color: $text-dark;
        font-feature-settings: 'clig' off, 'liga' off;
        font-family: Roboto, serif;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }

      &__item {
        padding: 4px 8px;
        border: none;
        background-color: transparent;
        color: $text-dark;
        font-feature-settings: 'clig' off, 'liga' off;
        font-family: Roboto, serif;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        cursor: pointer;
        transition: all 0.1s ease-in-out;

        &:first-of-type {
          border-right: 1px solid #D9DAD9;
        }

        &.active {
          color: $main-color;
        }
      }
    }
  }

  &-comments {
    list-style-type: none;
  }
}
</style>