<script setup lang="ts">
const props = defineProps({
  label: String,
  all: Number,
  count: Number,
})

const lineFilledWidth = ref(props.all && props.count ? `${(props.count / props.all) * 100}%` : "0px")
</script>

<template>
  <li class="filter__item">
    <label>
      {{ label }}
      <input type="checkbox" checked="checked">
      <span class="checkmark">
      </span>
      <span class="checkmark__bg"></span>
    </label>
    <div class="filter__line">
      <div class="line__basic"></div>
      <span>{{ count }}</span>
    </div>
  </li>
</template>

<style scoped lang="scss">
.filter {
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    width: 462px;

    label {
      padding-left: 30px;
      position: relative;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      color: $text-dark;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto, serif;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      cursor: pointer;

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;

        &:checked ~ .checkmark {
          background-color: $main-color;
          border: 2px solid $main-color;
        }
      }

      .checkmark {
        position: absolute;
        top: 50%;
        left: 0;
        height: 18px;
        width: 18px;
        border: 2px solid rgba(0, 0, 0, 0.48);
        border-radius: 2px;
        background-color: transparent;
        transform: translateY(-50%);
        z-index: 3;
        transition: all 0.1s ease-in-out;

        &:after {
          display: block;
          content: "";
          left: 0;
          top: 0;
          width: 5px;
          height: 9px;
          border: solid white;
          border-width: 0 2px 2px 0;
          -webkit-transform: translateX(50%) rotate(45deg);
          -ms-transform: translateX(50%) rotate(45deg);
          transform: translateX(50%) rotate(45deg);
          z-index: 4;
        }

        &__bg {
          content: '';
          position: absolute;
          top: 2px;
          bottom: 0;
          left: 0;
          width: 18px;
          height: 18px;
          border-radius: 4px;
          background: transparent;
          scale: 1.8;
          z-index: 1;
          transition: all 0.1s ease-in-out;
        }
      }

      &:hover {
        .checkmark {
          &__bg {
            background: $hover-grey;
          }
        }
      }
    }
  }

  &__line {
    position: relative;
    display: flex;
    align-items: center;
    gap: 16px;

    span {
      position: absolute;
      right: 0;
      transform: translateX(calc(100% + 16px));
      color: $text-dark;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto, serif;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .line__basic {
      position: relative;
      width: 273px;
      height: 8px;
      border-radius: 8px;
      background: #EEE;

      &:before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: v-bind(lineFilledWidth);
        border-radius: 8px;
        background: rgba(221, 185, 164, 0.50);
      }
    }
  }
}
</style>