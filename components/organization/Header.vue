<script setup lang="ts">
import { useModal } from 'vue-final-modal'
import {OrganizationModalsFeedback} from "#components";

const props = defineProps({
  organization: Object
})

const route = useRoute()
const config = useRuntimeConfig()
const { user } = useUserStore()
const { cities } = useCityStore()

const institutionsCategories = ["clinic", "salon"]

const category = computed(() => route.params.category as string)
const type = computed(() => institutionsCategories.includes(category.value) ? "institutions" : "specialists")

const isActive = ref(props.organization?.isFavorite)
const isContacted = ref(false)

const types = {
  "clinic": "Ветклиника",
  "salon": "Зоосалон",
  "vet": props.organization?.profession,
  "groomer": props.organization?.profession,
}

const croppedText = computed(() => {
  return props.organization?.about.length > 580 ?
      `${props.organization?.about.substring(0, 580)}...`
      : props.organization?.about
})

const toggleIsActive = async () => {
  const method = isActive.value ? "DELETE" : "POST"
  let statusCode = 0;

  try {
    await $fetch(`/api/user/${user.id}/favorites`, {
      method: method,
      baseURL: config.public.baseUrl,
      body: {
        organization_id: props.organization?.id,
        type: type.value,
      },
      onResponse(context) {
        statusCode = context.response.status
      },
    })

    if (statusCode === 200) {
      isActive.value = !isActive.value
    }
  } catch (e) {
    console.log(e)
  }
}

const handleContact = async () => {
  if (isContacted.value) {
    try {
      await navigator.clipboard.writeText("+79883232105");
    } catch (err) {
      console.error("Ошибка при копировании: ", err);
    }
  } else {
    isContacted.value = true
  }
}

const { open } = useModal({
  component: OrganizationModalsFeedback,
})

const handleReview = async () => {
  if (user.loggedIn) {
    await open()
  } else {
    await navigateTo("/auth/signin")
  }

}
</script>

<template>
  <section class="organization-header">
    <OrganizationSchedule :addresses="organization?.addresses" :schedule="organization?.schedule"/>

    <div class="organization-header__body">
      <div class="organization-header__media">
        <img :src="organization?.photo" alt="avatar">
        <button @click="toggleIsActive" class="organization-header__media-favorite" :class="{ 'organization-header__media-favorite__active': isActive }">
          <IconsFavorite />
        </button>
      </div>

      <div class="organization-header__info">
        <h3 class="organization-header__title">{{ organization?.name }}</h3>
        <div class="organization-header__criteria">
          <span class="organization-header__criteria-type">{{ types[organization?.type] }}</span>
          <span v-if="organization?.round_clock" class="organization-header__criteria-schedule">Круглосуточно</span>
          <span class="organization-header__criteria-city">{{ cities[organization?.city] }}</span>
        </div>

        <Rating :rating="Math.round(organization?.rating)" class="organization-header__rating"/>

        <div class="organization-header__copy">
          <!-- TODO: Когда буду заполнять текст в БД, нужно добавлять не больше чем на 580 символов. -->
          {{ croppedText }}
        </div>

        <div class="organization-header__buttons">
          <button @click="handleReview" class="feedback">Оставить отзыв</button>
          <button class="contact"
                  :class="{contacted: isContacted}"
                  @click="handleContact"
          >
            {{isContacted ? organization?.phone : "Связаться"}}
            <IconsCopy v-if="isContacted"/>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.organization {
  &-header {
    display: flex;
    align-items: center;
    gap: 32px;

    &__calendar {
      width: 388px;
      min-width: 388px;
      height: 556px;
      background: #888888;
    }

    &__body {
      display: flex;
      gap: 32px;
    }

    &__media {
      position: relative;

      img {
        width: 632px;
        height: 512px;
        border-radius: 10px;
        object-fit: cover;
      }

      &-favorite {
        position: absolute;
        top: 16px;
        right: 16px;
        transition: all 0.1s ease-in-out;
        padding: 7px;
        border-radius: 50%;
        border: none;
        cursor: pointer;

        svg {
          color: rgba(0, 0, 0, 0.2);
          transition: all 0.1s ease-in-out;
          z-index: 2;
          font-size: 20px;
        }

        &:hover {
          background-color: rgba(255, 255, 255, 0.9);

          svg {
            color: rgba(228, 0, 0, 0.56);
          }
        }

        &__active {
          background-color: #fff;

          svg {
            color: rgba(228, 0, 0, 0.87) !important;
          }
        }
      }

      &:active {
        svg {
          transform: scale(0.85);
        }
      }
    }

    &__info {
      display: flex;
      flex-direction: column;
    }

    &__title {
      margin-bottom: 16px;
      color: $text-dark;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto, serif;
      font-size: 48px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      font-variant: all-small-caps;
    }

    &__criteria {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;

      span {
        padding: 4px 16px;
        border-radius: 30px;
        color: var(--t-367, rgba(0, 0, 0, 0.67));
        font-feature-settings: 'clig' off, 'liga' off;
        font-family: Roboto, serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 171.429% */
        cursor: pointer;
        transition: opacity 0.1s ease-in-out;
      }

      &-type {
        background: rgba(221, 185, 164, 0.50);
      }

      &-schedule {
        background: rgba(254, 230, 185, 0.50);
      }

      &-city {
        border: 1px solid var(--Line, #D9DAD9);
      }
    }

    &__rating {
      margin-bottom: 32px;
      font-size: 24px;
    }

    &__copy {
      overflow: hidden;
      color: $dark-grey;
      font-feature-settings: 'clig' off, 'liga' off;
      text-overflow: ellipsis;
      font-family: Roboto, serif;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 30px; /* 166.667% */
    }

    &__buttons {
      display: flex;
      gap: 16px;
      margin-top: auto;

      button {
        width: 200px;
        padding: 12px;
        border-radius: 10px;
        font-feature-settings: 'clig' off, 'liga' off;
        font-family: Roboto, serif;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        cursor: pointer;
        transition: all 0.15s ease-in-out;

        &:active {
          scale: 0.98;
        }
      }

      .feedback {
        border: 1px solid $main-color;
        background-color: #fff;
        color: $main-color;

        &:hover {
          background: $hover-grey;
        }
      }

      .contact {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        color: #FFF;
        border: none;
        background: $main-color;

        &:hover {
          background: $main-color-dark;
        }

        &.contacted {
          background: #FFF;
          color: $text-dark;
          border: 1px solid $text-dark;

          &:hover {
            background: $hover-grey;
          }
        }
      }
    }
  }
}
</style>