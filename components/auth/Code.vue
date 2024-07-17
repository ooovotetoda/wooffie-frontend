<script setup lang="ts">
import {useCode} from "~/composables/useCode";

defineProps({
  isCodeValid: Boolean,
})

const emit = defineEmits(['updateCode', 'update:isCodeValid'])

const codeRef = ref < string | null > (null)

const { code, isCodeFocused, validateCode } = useCode(codeRef)

function handleInput() {
  validateCode()
  emit('updateCode', code.value)
  emit('update:isCodeValid', true)
}
</script>

<template>
  <fieldset class="code">
    <Transition name="fade">
      <legend
        v-if="isCodeFocused"
        class="code__legend"
      >
        Одноразовый код
      </legend>
    </Transition>
    <input
      ref="codeRef"
      v-model="code"
      type="text"
      maxlength="4"
      placeholder="Одноразовый код"
      class="code__input"
      @focus="isCodeFocused = true"
      @blur="isCodeFocused = false"
      @input="handleInput"
    >
  </fieldset>
  <p
    v-if="!isCodeValid"
    class="error"
  >
    Неверный код
  </p>
</template>

<style scoped>
.code {
  position: relative;
  border: none;
  text-align: left;
  margin-bottom: 16px;
}

.code__legend {
  position: absolute;
  padding: 0 14px;
  top: -12px;
  left: 20px;
  background-color: rgba(255, 255, 255, 1);
  color: var(--main-color); /* предполагается, что $main-color определен где-то в вашем CSS */
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
  transition: all 0.3s ease;
}

.code__input {
  width: 100%;
  padding: 10px 0 10px 46px;
  border-radius: 10px;
  border: 1px solid #D9DAD9;
  outline: none;
  color: var(--dark-grey);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM4OTg5ODkiIGQ9Ik03IDE1cS0xLjI1IDAtMi4xMjUtLjg3NVQ0IDEycTAtMS4yNS44NzUtMi4xMjVUNyA5cTEuMjUgMCAyLjEyNS44NzVUMTAgMTJxMCAxLjI1LS44NzUgMi4xMjVUNyAxNVptMCAzcTEuOTI1IDAgMy40NzUtMS4xVDEyLjY1IDE0SDEzbDEuMyAxLjNxLjE1LjE1LjMyNS4yMTJ0LjM3NS4wNjNxLjIgMCAuMzc1LS4wNjN0LjMyNS0uMjEyTDE3IDE0bDEuNzUgMS4zNzVxLjE1LjEyNS4zMzguMTg3dC4zODcuMDM4cS4yLS4wMjUuMzYzLS4xMTJ0LjI4Ny0uMjM4bDIuMjUtMi41NzVxLjEyNS0uMTUuMTg4LS4zMjV0LjA2Mi0uMzc1cTAtLjItLjA3NS0uMzYydC0uMi0uMjg4TDIxLjMyNSAxMC4zcS0uMTUtLjE1LS4zMzctLjIyNVQyMC42IDEwaC03Ljk1cS0uNi0xLjctMi4xMTMtMi44NVQ3IDZRNC41IDYgMi43NSA3Ljc1VDEgMTJxMCAyLjUgMS43NSA0LjI1VDcgMThaIi8+PC9zdmc=") no-repeat 20px center;
  transition: all 0.15s linear;
}

.code__input::-webkit-outer-spin-button,
.code__input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.code__input[type=number] {
  -moz-appearance: textfield;
}

.code__input:hover {
  border: 1px solid #000000;
}

.code__input:focus {
  border: 1px solid var(--main-color);
  background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNjZjg4MDIiIGQ9Ik07IDE1cS0xLjI1IDAtMi4xMjUtLjg3NVQ0IDEycTAtMS4yNS44NzUtMi4xMjVUNyA5cTEuMjUgMCAyLjEyNS44NzVUMTAgMTJxMCAxLjI1LS44NzUgMi4xMjVUNyAxNVptMCAzcTEuOTI1IDAgMy40NzUtMS4xVDEyLjY1IDE0SDEzbDEuMyAxLjNxLjE1LjE1LjMyNS4yMTJ0LjM3NS4wNjNxLjIgMCAuMzc1LS4wNjN0LjMyNS0uMjEyTDE3IDE0bDEuNzUgMS4zNzVxLjE1LjEyNS4zMzguMTg3dC4zODcuMDM4cS4yLS4wMjUuMzYzLS4xMTJ0LjI4Ny0uMjM4bDIuMjUtMi41NzVxLjEyNS0uMTUuMTg4LS4zMjV0LjA2Mi0uMzc1cTAtLjItLjA3NS0uMzYydC0uMi0uMjg4TDIxLjMyNSAxMC4zcS0uMTUtLjE1LS4zMzctLjIyNVQyMC42IDEwaC03Ljk1cS0uNi0xLjctMi4xMTMtMi44NVQ3IDZRNC41IDYgMi43NSA3Ljc1VDEgMTJxMCAyLjUgMS43NSA0LjI1VDcgMThaIi8+PC9zdmc=") no-repeat 20px center;
}

.error {
  text-align: left;
  margin: -12px 0 6px 16px;
  color: rgba(228, 0, 0, 0.87);
  font-family: Roboto, serif;
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
  background: rgba(255, 255, 255, 1);
}

.fade-enter-from, .fade-leave-to {
  margin: 0 14px;
  padding: 0;
  opacity: 0;
  background: rgba(255, 255, 255, 0);
}
</style>
