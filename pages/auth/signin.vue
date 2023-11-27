<script setup lang="ts">
definePageMeta({
  layout: "authorization",
})


const phone = ref<string | null>(null);
const password = ref<string | null>(null);
const showPassword = ref<boolean>(false)
const isPhoneFocused = ref<boolean>(false);
const isPasswordFocused = ref<boolean>(false);
const isPhoneValid = ref<boolean>(true);
const isPasswordValid = ref<boolean>(true);

const handleFocus = (event: FocusEvent, type: string) => {
  if (type === 'phone') {
    isPhoneFocused.value = true;
  } else if (type === 'password') {
    isPasswordFocused.value = true;
  }

  const target = event.target as HTMLInputElement;
  if (target && target.placeholder !== undefined) {
    target.placeholder = "";
  }

}

const handleBlur = (event: FocusEvent, placeholderText: string, type: 'phone' | 'password') => {
  const target = event.target as HTMLInputElement;
  target.placeholder = placeholderText;

  if (type === 'phone') {
    const regExp = /^(?:\+7|8)?[789]\d{9}$/;
    isPhoneValid.value = phone.value ? regExp.test(phone.value) : true;
    isPhoneFocused.value = false;
  } else if (type === 'password') {
    // isPasswordValid.value = password.value ? password.value.replace(/\s+/g, '').length > 8 : false;
    isPasswordFocused.value = false;
  }
};

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const handlePasswordChange = () => {
  password.value = password.value ? password.value.replace(/\s+/g, '') : null;
};

const handleSubmit = () => {
  if (phone.value === null) {
    isPhoneValid.value = false
    return
  }

  if (password.value === null || password.value.length < 8) {
    isPasswordValid.value = false
    return
  }

  navigateTo("/")
}

</script>

<template>
  <div class="authorization">
    <h3 class="authorization-title">Авторизация</h3>
    <form @submit.prevent="handleSubmit" class="authorization-form">
      <fieldset>
        <Transition name="fade">
          <legend v-if="isPhoneFocused">Телефон</legend>
        </Transition>
        <input
          @focus="(event) => handleFocus(event, 'phone')"
          @blur="(event) => handleBlur(event, 'Телефон', 'phone')"
          type="tel"
          placeholder="Телефон"
          pattern = "\+?\d{1,3}?\d{1,12}"
          v-model="phone"
        >
      </fieldset>
      <p v-if="!isPhoneValid" class="authorization-error">Неверный формат</p>

      <fieldset>
        <Transition name="fade">
          <legend v-if="isPasswordFocused">Пароль</legend>
        </Transition>
        <input
          @focus="(event) => handleFocus(event, 'password')"
          @blur="(event) => handleBlur(event, 'Пароль', 'password')"
          @input="handlePasswordChange"
          ref="passwordInputRef"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Пароль"
          v-model="password"
        >
        <IconsPasswordHide @click.prevent="toggleShowPassword"/>
      </fieldset>
      <p v-if="!isPasswordValid" class="authorization-error">Заполните поле (минимум 8 символов)</p>

      <NuxtLink to="/auth/tel">
        <div class="authorization-recovery-pass">
          <IconsQuestion/>
          <span>Не помню пароль</span>
        </div>
      </NuxtLink>

      <button class="authorization-login">Войти</button>
    </form>

    <NuxtLink to="/auth/signup">
      <button class="authorization-registration">Регистрация</button>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.authorization {
  text-align: center;

  &-title {
    margin-bottom: 32px;
    color: $main-color;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto;
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  &-form {
    fieldset {
      position: relative;
      border: none;
      text-align: left;
      margin-bottom: 16px;

      legend {
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

      svg {
        position: absolute;
        top: 50%;
        right: 24px;
        transform: translateY(-50%);
        cursor: pointer;
        fill: #BABABA;
        transition: all 0.15s linear;

        &:hover {
          fill: #888888;
        }

        &:active {
          fill: #343434;
        }
      }
    }

    input {
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
      transition: all 0.15s linear;

      &:hover {
        border: 1px solid #000000;
      }

      &:focus {
        border: 1px solid $main-color;
      }

      &[type=tel] {
        background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM4OTg5ODkiIGQ9Ik0xOS45NSAyMXEtMy4xMjUgMC02LjE4Ny0xLjM1VDguMiAxNS44cS0yLjUtMi41LTMuODUtNS41NVQzIDQuMDVWM2g1LjlsLjkyNSA1LjAyNWwtMi44NSAyLjg3NXEuNTUuOTc1IDEuMjI1IDEuODV0MS40NSAxLjYyNXEuNzI1LjcyNSAxLjU4OCAxLjM4OFQxMy4xIDE3bDIuOS0yLjlsNSAxLjAyNVYyMWgtMS4wNVoiLz48L3N2Zz4=") no-repeat 20px center;

        &:focus {
          background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNjZjg4MDIiIGQ9Ik0xOS45NSAyMXEtMy4xMjUgMC02LjE3NS0xLjM2M3QtNS41NS0zLjg2MnEtMi41LTIuNS0zLjg2Mi01LjU1VDMgNC4wNXEwLS40NS4zLS43NXQuNzUtLjNIOC4xcS4zNSAwIC42MjUuMjM4dC4zMjUuNTYybC42NSAzLjVxLjA1LjQtLjAyNS42NzVUOS40IDguNDVMNi45NzUgMTAuOXEuNS45MjUgMS4xODcgMS43ODd0MS41MTMgMS42NjNxLjc3NS43NzUgMS42MjUgMS40MzhUMTMuMSAxN2wyLjM1LTIuMzVxLjIyNS0uMjI1LjU4OC0uMzM4dC43MTItLjA2MmwzLjQ1LjdxLjM1LjEuNTc1LjM2M1QyMSAxNS45djQuMDVxMCAuNDUtLjMuNzV0LS43NS4zWiIvPjwvc3ZnPg==") no-repeat 20px center;
        }
      }

      &[type=password], &[type=text] {
        background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM4OTg5ODkiIGQ9Ik02IDIycS0uODI1IDAtMS40MTMtLjU4OFQ0IDIwVjEwcTAtLjgyNS41ODgtMS40MTNUNiA4aDFWNnEwLTIuMDc1IDEuNDYzLTMuNTM4VDEyIDFxMi4wNzUgMCAzLjUzOCAxLjQ2M1QxNyA2djJoMXEuODI1IDAgMS40MTMuNTg4VDIwIDEwdjEwcTAgLjgyNS0uNTg4IDEuNDEzVDE4IDIySDZabTYtNXEuODI1IDAgMS40MTMtLjU4OFQxNCAxNXEwLS44MjUtLjU4OC0xLjQxM1QxMiAxM3EtLjgyNSAwLTEuNDEzLjU4OFQxMCAxNXEwIC44MjUuNTg4IDEuNDEzVDEyIDE3Wk05IDhoNlY2cTAtMS4yNS0uODc1LTIuMTI1VDEyIDNxLTEuMjUgMC0yLjEyNS44NzVUOSA2djJaIi8+PC9zdmc+") no-repeat 20px center;

        &:focus {
          background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNjZjg4MDIiIGQ9Ik02IDIycS0uODI1IDAtMS40MTMtLjU4OFQ0IDIwVjEwcTAtLjgyNS41ODgtMS40MTNUNiA4aDFWNnEwLTIuMDc1IDEuNDYzLTMuNTM4VDEyIDFxMi4wNzUgMCAzLjUzOCAxLjQ2M1QxNyA2djJoMXEuODI1IDAgMS40MTMuNTg4VDIwIDEwdjEwcTAgLjgyNS0uNTg4IDEuNDEzVDE4IDIySDZabTYtNXEuODI1IDAgMS40MTMtLjU4OFQxNCAxNXEwLS44MjUtLjU4OC0xLjQxM1QxMiAxM3EtLjgyNSAwLTEuNDEzLjU4OFQxMCAxNXEwIC44MjUuNTg4IDEuNDEzVDEyIDE3Wk05IDhoNlY2cTAtMS4yNS0uODc1LTIuMTI1VDEyIDNxLTEuMjUgMC0yLjEyNS44NzVUOSA2djJaIi8+PC9zdmc+") no-repeat 20px center;
        }
      }
    }
  }

  &-recovery-pass {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
    color: $dark-grey;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    transition: all 0.15s ease-in-out;

    span {
      text-decoration: none;
    }

    &:hover {
      color: $main-color;
    }
  }

  &-login {
    width: 100%;
    padding: 12px 0;
    margin-bottom: 12px;
    border-radius: 10px;
    border: none;
    background: $main-color;
    color: #FFF;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: $main-color-dark;
    }

    &:active {
      transform: scale(0.95);
    }
  }

  &-registration {
    width: 100%;
    padding: 12px 0;
    border-radius: 10px;
    border: none;
    background: #FFF;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: $hover-grey;
    }

    &:active {
      transform: scale(0.95);
    }
  }

  &-error {
    text-align: left;
    margin: -12px 0 6px 16px;
    color: rgba(228, 0, 0, 0.87);
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 171.429% */
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.1s ease-in-out;
  margin: 0;
  padding: 0 14px;
}
.fade-enter-from, .fade-leave-to {
  margin: 0 14px;
  padding: 0;
  opacity: 0;
}
</style>