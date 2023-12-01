<script setup lang="ts">
const password = ref<string | null>("password");
const showPassword = ref<boolean>(false);
const isPasswordFocused = ref<boolean>(false);
const isPasswordValid = ref<boolean>(true);

const handlePasswordChange = () => {
  password.value = password.value ? password.value.replace(/\s+/g, '') : null;
};

const handleSavePassword = () => {
  if (!password.value || password.value.length < 8) {
    isPasswordValid.value = false
  } else {
    isPasswordValid.value = true
  }
}
</script>

<template>
  <label for="tel" class="profile__label">Пароль</label>
  <div class="profile__input">
    <input
        :type="showPassword ? 'text' : 'password'"
        placeholder="Пароль"
        v-model="password"
        @focus="isPasswordFocused = true"
        @blur="isPasswordFocused = false"
        @input="handlePasswordChange"
    >
    <IconsPasswordHide v-if="showPassword" @click.prevent="showPassword = !showPassword"/>
    <IconsPasswordShow v-else @click.prevent="showPassword = !showPassword"/>
  </div>
  <p v-if="!isPasswordValid" class="error">Заполните поле (минимум 8 символов)</p>
  <button @click="handleSavePassword" class="profile__btn">Изменить</button>
</template>

<style scoped lang="scss">
.profile {
  &__label {
    display: block;
    width: 148px;
    min-width: 148px;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &__input {
    position: relative;

    input {
      width: 400px;
      padding: 10px 56px;
      border-radius: 10px;
      border: 1px solid #D9DAD9;
      outline: none;
      background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM4OTg5ODkiIGQ9Ik02IDIycS0uODI1IDAtMS40MTMtLjU4OFQ0IDIwVjEwcTAtLjgyNS41ODgtMS40MTNUNiA4aDFWNnEwLTIuMDc1IDEuNDYzLTMuNTM4VDEyIDFxMi4wNzUgMCAzLjUzOCAxLjQ2M1QxNyA2djJoMXEuODI1IDAgMS40MTMuNTg4VDIwIDEwdjEwcTAgLjgyNS0uNTg4IDEuNDEzVDE4IDIySDZabTYtNXEuODI1IDAgMS40MTMtLjU4OFQxNCAxNXEwLS44MjUtLjU4OC0xLjQxM1QxMiAxM3EtLjgyNSAwLTEuNDEzLjU4OFQxMCAxNXEwIC44MjUuNTg4IDEuNDEzVDEyIDE3Wk05IDhoNlY2cTAtMS4yNS0uODc1LTIuMTI1VDEyIDNxLTEuMjUgMC0yLjEyNS44NzVUOSA2djJaIi8+PC9zdmc+") no-repeat 20px center;
      color: $dark-grey;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto;
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
        &::-webkit-input-placeholder { color:transparent; }
        &:-moz-placeholder { color:transparent; } /* FF 4-18 */
        &::-moz-placeholder { color:transparent; } /* FF 19+ */
        &:-ms-input-placeholder { color:transparent; } /* IE 10+ */
      }
    }

    svg {
      position: absolute;
      top: 50%;
      right: 16px;
      transform: translateY(-50%);
      font-size: 20px;
      cursor: pointer;
      color: #BABABA;
      transition: all 0.15s linear;

      &:hover {
        color: #888888;
      }

      &:active {
        color: #343434;
      }
    }
  }

  &__btn {
    padding: 12px 32px;
    border-radius: 10px;
    border: none;
    background: #FFFFFF;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
    transition: all 0.1s ease-in-out;

    &:hover {
      background: $hover-grey;
    }

    &:active {
      background: #efeeee;
    }
  }
}

.error {
  position: absolute;
  bottom: -26px;
  left: 180px;
  text-align: left;
  color: rgba(228, 0, 0, 0.87);
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
}
</style>