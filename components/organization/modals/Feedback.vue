<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()
</script>

<template>
  <VueFinalModal
    class=""
    content-class="modal__wrapper"
    @update:model-value="val => emit('update:modelValue', val)"
  >
    <div class="modal__window">
      <h2 class="modal__title">
        Отзыв
      </h2>

      <ClientOnly>
        <Rating :rating="4" />
        <form action="">
          <textarea name="feedback"
                    id="feedback"
                    class="modal__textarea"
                    cols="30"
                    rows="10"
                    placeholder="Напишите отзыв"
          ></textarea>
        </form>

        <div class="modal__buttons">
          <button class="" @click="emit('update:modelValue', false)">
            Отмена
          </button>
          <button class="" @click="emit('update:modelValue', false)">
            Отправить
          </button>
        </div>

      </ClientOnly>
    </div>
  </VueFinalModal>
</template>


<style scoped lang="scss">
.modal {
  &__wrapper {

  }

  &__window {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 56px;
    border-radius: 10px;
    background: var(--t-1100, #FFF);
    box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.10);

    .rating {
      margin-bottom: 18px;
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
    padding: 10px 24px;
    margin-bottom: 40px;
    border-radius: 10px;
    border: 1px solid #D9DAD9;
    background: #FFF;
  }
}
</style>