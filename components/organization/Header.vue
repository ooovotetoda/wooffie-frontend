<script setup lang="ts">
import { useModal } from 'vue-final-modal'
import {OrganizationModalsFeedback} from "#components";

const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.\n" +
  "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing.\n" +
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen boo"

const isActive = ref(false)
const isContacted = ref(false)

const croppedText = computed(() => {
  return text.length > 620 ?
      `${text.substring(0, 620)}...`
      : text
})


const toggleIsActive = () => {
  isActive.value = !isActive.value
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
</script>

<template>
  <section class="organization-header">
    <OrganizationSchedule/>

    <div class="organization-header__body">
      <div class="organization-header__media">
        <img src="/images/clinic.jpg" alt="avatar">
        <button @click="toggleIsActive" class="organization-header__media-favorite" :class="{ 'organization-header__media-favorite__active': isActive }">
          <IconsFavorite />
        </button>
      </div>

      <div class="organization-header__info">
        <h3 class="organization-header__title">Альфа центр здоровья</h3>
        <div class="organization-header__criteria">
          <span class="organization-header__criteria-type">Ветклиника</span>
          <span class="organization-header__criteria-schedule">Круглосуточно</span>
          <span class="organization-header__criteria-city">Краснодар</span>
        </div>

        <Rating :rating="4" class="organization-header__rating"/>

        <div class="organization-header__copy">
          <!-- TODO: Когда буду заполнять текст в БД, нужно добавлять не больше чем на 600 символов. -->
          {{ croppedText }}
        </div>

        <div class="organization-header__buttons">
          <button @click="() => open()" class="feedback">Оставить отзыв</button>
          <button class="contact"
                  :class="{contacted: isContacted}"
                  @click="handleContact"
          >
            {{isContacted ? "+79883232105" : "Связаться"}}
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