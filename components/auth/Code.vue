<script setup lang="ts">
const emit = defineEmits(["updateCode", "update:isCodeValid"])

const props = defineProps({
  isCodeValid: Boolean
})

const codeRef = ref<string | null>(null)
const code = ref<string | null>(null)
const isCodeFocused = ref<boolean>(false);

const handleInput = () => {
  let maxLength = 6;
  if (code.value && code.value.length > maxLength) {
    code.value = code.value.slice(0, maxLength);
  }
  emit("updateCode", code.value)
  emit("update:isCodeValid", true)
}
</script>

<template>
  <fieldset class="code">
    <Transition name="fade">
      <legend v-if="isCodeFocused" class="code__legend">Одноразовый код</legend>
    </Transition>
    <input
        type="text"
        maxlength=6
        placeholder="Одноразовый код"
        class="code__input"
        ref="codeRef"
        v-model="code"
        @focus="isCodeFocused = true"
        @blur="isCodeFocused = false"
        @input="handleInput"
    >
  </fieldset>
  <p v-if="!isCodeValid" class="error">Неверный формат</p>
</template>

<style scoped lang="scss">
.code {
  position: relative;
  border: none;
  text-align: left;
  margin-bottom: 16px;

  &__legend {
    position: absolute;
    padding: 0 14px;
    top: -12px;
    left: 20px;
    background-color: #fff;
    color: $main-color;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 171.429% */
    transition: all 0.3s ease;
  }

  &__input {
    width: 100%;
    padding: 10px 0 10px 46px;
    border-radius: 10px;
    border: 1px solid #D9DAD9;
    outline: none;
    color: $dark-grey;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    cursor: pointer;
    background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM4OTg5ODkiIGQ9Ik03IDE1cS0xLjI1IDAtMi4xMjUtLjg3NVQ0IDEycTAtMS4yNS44NzUtMi4xMjVUNyA5cTEuMjUgMCAyLjEyNS44NzVUMTAgMTJxMCAxLjI1LS44NzUgMi4xMjVUNyAxNVptMCAzcTEuOTI1IDAgMy40NzUtMS4xVDEyLjY1IDE0SDEzbDEuMyAxLjNxLjE1LjE1LjMyNS4yMTJ0LjM3NS4wNjNxLjIgMCAuMzc1LS4wNjN0LjMyNS0uMjEyTDE3IDE0bDEuNzUgMS4zNzVxLjE1LjEyNS4zMzguMTg3dC4zODcuMDM4cS4yLS4wMjUuMzYzLS4xMTJ0LjI4Ny0uMjM4bDIuMjUtMi41NzVxLjEyNS0uMTUuMTg4LS4zMjV0LjA2Mi0uMzc1cTAtLjItLjA3NS0uMzYydC0uMi0uMjg4TDIxLjMyNSAxMC4zcS0uMTUtLjE1LS4zMzctLjIyNVQyMC42IDEwaC03Ljk1cS0uNi0xLjctMi4xMTMtMi44NVQ3IDZRNC41IDYgMi43NSA3Ljc1VDEgMTJxMCAyLjUgMS43NSA0LjI1VDcgMThaIi8+PC9zdmc+") no-repeat 20px center;
    transition: all 0.15s linear;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type=number] {
      -moz-appearance: textfield;
    }

    &:hover {
      border: 1px solid #000000;
    }

    &:focus {
      border: 1px solid $main-color;
      background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNjZjg4MDIiIGQ9Ik03IDE1cS0xLjI1IDAtMi4xMjUtLjg3NVQ0IDEycTAtMS4yNS44NzUtMi4xMjVUNyA5cTEuMjUgMCAyLjEyNS44NzVUMTAgMTJxMCAxLjI1LS44NzUgMi4xMjVUNyAxNVptMCAzcTEuOTI1IDAgMy40NzUtMS4xVDEyLjY1IDE0SDEzbDEuMyAxLjNxLjE1LjE1LjMyNS4yMTJ0LjM3NS4wNjNxLjIgMCAuMzc1LS4wNjN0LjMyNS0uMjEyTDE3IDE0bDEuNzUgMS4zNzVxLjE1LjEyNS4zMzguMTg3dC4zODcuMDM4cS4yLS4wMjUuMzYzLS4xMTJ0LjI4Ny0uMjM4bDIuMjUtMi41NzVxLjEyNS0uMTUuMTg4LS4zMjV0LjA2Mi0uMzc1cTAtLjItLjA3NS0uMzYydC0uMi0uMjg4TDIxLjMyNSAxMC4zcS0uMTUtLjE1LS4zMzctLjIyNVQyMC42IDEwaC03Ljk1cS0uNi0xLjctMi4xMTMtMi44NVQ3IDZRNC41IDYgMi43NSA3Ljc1VDEgMTJxMCAyLjUgMS43NSA0LjI1VDcgMThaIi8+PC9zdmc+") no-repeat 20px center;
      &::-webkit-input-placeholder { color:transparent; }
      &:-moz-placeholder { color:transparent; } /* FF 4-18 */
      &::-moz-placeholder { color:transparent; } /* FF 19+ */
      &:-ms-input-placeholder { color:transparent; } /* IE 10+ */
    }
  }
}

.error {
  text-align: left;
  margin: -12px 0 6px 16px;
  color: rgba(228, 0, 0, 0.87);
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter-to, .fade-leave-from {
  margin: 0;
  padding: 0 14px;
  opacity: 1;
}

.fade-enter-from, .fade-leave-to {
  margin: 0 14px;
  padding: 0;
  opacity: 0;
}
</style>