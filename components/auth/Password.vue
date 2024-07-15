<script setup lang="ts">
defineProps({
  isPasswordValid: Boolean,
})

const emit = defineEmits(['updatePassword', 'update:isPasswordValid'])

const passwordRef = ref(null)
const password = ref < string | null > (null)
const showPassword = ref < boolean > (false)
const isPasswordFocused = ref < boolean > (false)

function handlePasswordChange() {
  password.value = password.value ? password.value.replace(/\s+/g, '') : null
  emit('updatePassword', password.value)
  emit('update:isPasswordValid', true)
}
</script>

<template>
  <fieldset class="password">
    <Transition name="fade">
      <legend
        v-if="isPasswordFocused"
        class="password__legend"
      >
        Пароль
      </legend>
    </Transition>
    <input
      ref="passwordRef"
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      placeholder="Пароль"
      class="password__input"
      @focus="isPasswordFocused = true"
      @blur="isPasswordFocused = false"
      @input="handlePasswordChange"
    >
    <IconsPasswordHide
      v-if="showPassword"
      @click.prevent="showPassword = !showPassword"
    />
    <IconsPasswordShow
      v-else
      @click.prevent="showPassword = !showPassword"
    />
  </fieldset>
  <p
    v-if="!isPasswordValid"
    class="error"
  >
    Заполните поле (минимум 8 символов)
  </p>
</template>

<style scoped lang="scss">
.password {
  position: relative;
  border: none;
  text-align: left;
  margin-bottom: 16px;

  &__legend {
    position: absolute;
    padding: 0 14px;
    top: -12px;
    left: 20px;
    background-color: rgba(255, 255, 255, 1);
    color: $main-color;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
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
    background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM4OTg5ODkiIGQ9Ik02IDIycS0uODI1IDAtMS40MTMtLjU4OFQ0IDIwVjEwcTAtLjgyNS41ODgtMS40MTNUNiA4aDFWNnEwLTIuMDc1IDEuNDYzLTMuNTM4VDEyIDFxMi4wNzUgMCAzLjUzOCAxLjQ2M1QxNyA2djJoMXEuODI1IDAgMS40MTMuNTg4VDIwIDEwdjEwcTAgLjgyNS0uNTg4IDEuNDEzVDE4IDIySDZabTYtNXEuODI1IDAgMS40MTMtLjU4OFQxNCAxNXEwLS44MjUtLjU4OC0xLjQxM1QxMiAxM3EtLjgyNSAwLTEuNDEzLjU4OFQxMCAxNXEwIC44MjUuNTg4IDEuNDEzVDEyIDE3Wk05IDhoNlY2cTAtMS4yNS0uODc1LTIuMTI1VDEyIDNxLTEuMjUgMC0yLjEyNS44NzVUOSA2djJaIi8+PC9zdmc+") no-repeat 20px center;
    color: $dark-grey;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.15s linear;

    &:hover {
      border: 1px solid #000000;
    }

    &:focus {
      border: 1px solid $main-color;
      background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNjZjg4MDIiIGQ9Ik02IDIycS0uODI1IDAtMS40MTMtLjU4OFQ0IDIwVjEwcTAtLjgyNS41ODgtMS40MTNUNiA4aDFWNnEwLTIuMDc1IDEuNDYzLTMuNTM4VDEyIDFxMi4wNzUgMCAzLjUzOCAxLjQ2M1QxNyA2djJoMXEuODI1IDAgMS40MTMuNTg4VDIwIDEwdjEwcTAgLjgyNS0uNTg4IDEuNDEzVDE4IDIySDZabTYtNXEuODI1IDAgMS40MTMtLjU4OFQxNCAxNXEwLS44MjUtLjU4OC0xLjQxM1QxMiAxM3EtLjgyNSAwLTEuNDEzLjU4OFQxMCAxNXEwIC44MjUuNTg4IDEuNDEzVDEyIDE3Wk05IDhoNlY2cTAtMS4yNS0uODc1LTIuMTI1VDEyIDNxLTEuMjUgMC0yLjEyNS44NzVUOSA2djJaIi8+PC9zdmc+") no-repeat 20px center;
      @include placeholder;
    }
  }

  svg {
    position: absolute;
    top: 50%;
    right: 24px;
    transform: translateY(-50%);
    font-size: 20px;
    cursor: pointer;
    color: #BABABA;
    transition: all 0.1s linear;

    &:hover {
      color: #888888;
    }

    &:active {
      color: #343434;
    }
  }
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
