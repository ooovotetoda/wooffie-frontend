<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()

const rating = ref(0)
const comment = ref<string | null>(null)

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
        <form @submit.prevent="console.log('Submitted')">
          <textarea name="feedback"
                    id="feedback"
                    class="modal__textarea"
                    :class="{filled: comment}"
                    cols="30"
                    rows="10"
                    placeholder="Напишите отзыв"
                    v-model="comment"
          ></textarea>
        </form>

        <div class="modal__buttons">
          <button class="cancel" @click="emit('update:modelValue', false)">
            Отмена
          </button>
          <button class="send" @click="emit('update:modelValue', false)">
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
    font-family: Roboto;
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
    margin-bottom: 40px;
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
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    transition: all 0.1s ease-in-out;

    &.filled {
      padding-left: 24px;
      background-image: none;
      &::-webkit-input-placeholder { color:transparent; }
      &:-moz-placeholder { color:transparent; } /* FF 4-18 */
      &::-moz-placeholder { color:transparent; } /* FF 19+ */
      &:-ms-input-placeholder { color:transparent; } /* IE 10+ */
    }
  }

  &__buttons {
    width: 100%;
    display: flex;
    gap: 28px;

    button {
      flex: 1;
      padding: 12px 0;
      border: none;
      border-radius: 10px;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto;
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