<script setup lang="ts">
import {formatPhone, useUserStore} from "#imports";

const { user } = useUserStore()

const phone = formatPhone(user.phoneNumber)

const handleEdit = () => {

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
        readonly
    >
  </div>
  <button @click.prevent="handleEdit" class="profile__btn">Изменить</button>
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
      transition: all 0.15s linear;
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