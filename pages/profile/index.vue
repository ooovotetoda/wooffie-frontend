<script setup lang="ts">
definePageMeta({
  layout: "profile",
  breadcrumb: "Профиль"
})

const phone = ref("+79883233109")
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

const handleSavePassword = () => {
  if (!password.value || password.value.length < 8) {
    isPasswordValid.value = false
  } else {
    isPasswordValid.value = true
  }
}
</script>

<template>
  <section class="profile">
    <div class="profile__media">
      <img src="/images/user-icon.svg" alt="user">
    </div>
    <ul class="profile__list">
      <li class="profile__item">
        <label for="tel" class="profile__label">Телефон</label>
        <div class="profile__input">
          <input
          @focus="(event) => handleFocus(event, 'phone')"
          @blur="(event) => handleBlur(event, 'Телефон', 'phone')"
          type="tel"
          placeholder="Телефон"
          pattern = "\+?\d{1,3}?\d{1,12}"
          v-model="phone"
          >
        </div>
        <p v-if="!isPhoneValid" class="input__error">Неверный формат</p>
        <button class="profile__btn">Изменить</button>
      </li>

      <li class="profile__item">
        <label for="tel" class="profile__label">Пароль</label>
          <div class="profile__input">
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
        </div>
        <p v-if="!isPasswordValid" class="input__error">Заполните поле (минимум 8 символов)</p>
        <button @click="handleSavePassword" class="profile__btn">Изменить</button>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.profile {
  min-height: 900px;

  &__media {
    width: 100px;
    height: 100px;
    margin-bottom: 48px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__list {
    list-style-type: none;
  }

  &__item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 32px;

    input {
      width: 400px;
      padding: 10px 56px;
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

    svg {
        position: absolute;
        top: 50%;
        right: 16px;
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

  &__input {
    position: relative;
  }

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
    transition: all 0.15s ease-in-out;

    &:hover {
      background: $hover-grey;
    }
  }
}

.input__error {
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