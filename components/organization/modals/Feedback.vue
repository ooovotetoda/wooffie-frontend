<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import {$fetch} from "ofetch";
import type {SendReviewBody} from "~/types/reviews";

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()


const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const { user } = useUserStore()

const institutionsCategories = ["clinic", "salon"]

const category = computed(() => route.params.category as string)
const type = computed(() => institutionsCategories.includes(category.value) ? "institution_id" : "specialist_id")


const rating = ref(0)
const comment = ref<string | null>(null)
const invalid = ref<boolean>(false)

const body = computed((): SendReviewBody => {
  const result: Partial<SendReviewBody> = {
    user_id: user.id ?? null,
    rating: rating.value,
    review_text: comment.value
  };

  const id = parseInt(route.params.id as string);
  if (!isNaN(id) && (type.value === "institution_id" || type.value === "specialist_id")) {
    result[type.value] = id;
  }

  return result as SendReviewBody;
});

const submitReview = async () => {
  if (!rating.value || !comment.value) {
    invalid.value = true
    return
  }
  try {
    const response = await $fetch("/api/reviews", {
      method: "POST",
      baseURL: config.public.baseUrl,
      body: body.value
    })

    if (response.status === "OK") {
      emit('update:modelValue', false)
      //TODO: подумать, нужна ли  перезагрузка страницы, после отправки комментария
      router.go(0)
    }
  } catch (e) {
    console.error(e)
  }
}

</script>

<template>
  <VueFinalModal
    class=""
    content-class="modal__wrapper"
    @update:model-value="val => emit('update:modelValue', val)"
  >
    <div class="modal__window">
      <IconsClose class="modal__close" @click="emit('update:modelValue', false)"/>
      <h2 class="modal__title">
        Отзыв
      </h2>

      <ClientOnly>
        <Rating :rating="rating" @rated="(index) => rating = index"/>
        <form>
          <textarea name="feedback"
                    id="feedback"
                    class="modal__textarea"
                    :class="{filled: comment}"
                    cols="30"
                    rows="10"
                    placeholder="Напишите отзыв"
                    v-model="comment"
          ></textarea>
          <p v-if="invalid" class="modal__invalid">Выберите оценку и напишите отзыв</p>
        </form>

        <div class="modal__buttons">
          <button class="cancel" @click="emit('update:modelValue', false)">
            Отмена
          </button>
          <button class="send" @click="submitReview">
            Отправить
          </button>
        </div>

      </ClientOnly>
    </div>
  </VueFinalModal>
</template>


<style scoped lang="scss">
.modal {
  &__window {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 56px;
    border-radius: 10px;
    background: #FFF;
    box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.10);

    .rating {
      margin-bottom: 18px;
      font-size: 32px;
      justify-content: center;
    }
  }

  &__title {
    color: #000;
    margin-bottom: 16px;
    text-align: center;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  &__textarea {
    width: 400px;
    height: 200px;
    padding: 10px 24px;
    padding-left: 48px;
    margin-bottom: 10px;
    border-radius: 10px;
    border: 1px solid #D9DAD9;
    background: #FFF;
    background-image: url("https://api.iconify.design/material-symbols:chat.svg?color=%23898989");
    background-position: 20px 14px; /* Позиционирование иконки */
    background-repeat: no-repeat;
    resize: none;
    outline: none;
    color: $dark-grey;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    transition: all 0.1s ease-in-out;

    &.filled {
      padding-left: 24px;
      background-image: none;
      @include placeholder;
    }
  }

  &__invalid {
    padding-left: 28px;
    color: var(--Color-Text-Erorr, rgba(228, 0, 0, 0.87));
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }

  &__buttons {
    width: 100%;
    display: flex;
    gap: 28px;
    margin-top: 30px;

    button {
      flex: 1;
      padding: 12px 0;
      border: none;
      border-radius: 10px;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto, serif;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      transition: all 0.15s ease-in-out;
      cursor: pointer;
    }

    .cancel {
      color: $text-dark;
      background: #fff;

      &:hover {
        background: $hover-grey;
      }
    }

    .send {
      color: #FFF;
      background: $main-color;

      &:hover {
        background: $main-color-dark;
      }
    }
  }

  &__close {
    position: absolute;
    top: 44px;
    right: 44px;
    cursor: pointer;
  }
}
</style>