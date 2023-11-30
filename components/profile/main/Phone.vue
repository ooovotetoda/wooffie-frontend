<script setup lang="ts">
const phone = ref("+79883233109")
const isPhoneFocused = ref<boolean>(false);
const isPhoneValid = ref<boolean>(true);

const handleSavePhone = () => {
  const regExp = /^(?:\+7|8)?[789]\d{9}$/;
  isPhoneValid.value = phone.value ? regExp.test(phone.value) : false;

  if (isPhoneValid.value) {
    //Отправка запроса на изменение
    console.log("Changed")
  }
}
</script>

<template>
  <label for="tel" class="profile__label">Телефон</label>
  <div class="profile__input">
    <input
        type="tel"
        placeholder="Телефон"
        pattern = "\+?\d{1,3}?\d{1,12}"
        v-model="phone"
        @focus="isPhoneFocused = true"
        @blur="isPhoneFocused = false"
    >
  </div>
  <p v-if="!isPhoneValid" class="error">Неверный формат</p>
  <button @click.prevent="handleSavePhone" class="profile__btn">Изменить</button>
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
      background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM4OTg5ODkiIGQ9Ik0xOS45NSAyMXEtMy4xMjUgMC02LjE4Ny0xLjM1VDguMiAxNS44cS0yLjUtMi41LTMuODUtNS41NVQzIDQuMDVWM2g1LjlsLjkyNSA1LjAyNWwtMi44NSAyLjg3NXEuNTUuOTc1IDEuMjI1IDEuODV0MS40NSAxLjYyNXEuNzI1LjcyNSAxLjU4OCAxLjM4OFQxMy4xIDE3bDIuOS0yLjlsNSAxLjAyNVYyMWgtMS4wNVoiLz48L3N2Zz4=") no-repeat 20px center;
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
        background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNjZjg4MDIiIGQ9Ik0xOS45NSAyMXEtMy4xMjUgMC02LjE3NS0xLjM2M3QtNS41NS0zLjg2MnEtMi41LTIuNS0zLjg2Mi01LjU1VDMgNC4wNXEwLS40NS4zLS43NXQuNzUtLjNIOC4xcS4zNSAwIC42MjUuMjM4dC4zMjUuNTYybC42NSAzLjVxLjA1LjQtLjAyNS42NzVUOS40IDguNDVMNi45NzUgMTAuOXEuNS45MjUgMS4xODcgMS43ODd0MS41MTMgMS42NjNxLjc3NS43NzUgMS42MjUgMS40MzhUMTMuMSAxN2wyLjM1LTIuMzVxLjIyNS0uMjI1LjU4OC0uMzM4dC43MTItLjA2MmwzLjQ1LjdxLjM1LjEuNTc1LjM2M1QyMSAxNS45djQuMDVxMCAuNDUtLjMuNzV0LS43NS4zWiIvPjwvc3ZnPg==") no-repeat 20px center;
        &::-webkit-input-placeholder { color:transparent; }
        &:-moz-placeholder { color:transparent; } /* FF 4-18 */
        &::-moz-placeholder { color:transparent; } /* FF 19+ */
        &:-ms-input-placeholder { color:transparent; } /* IE 10+ */
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