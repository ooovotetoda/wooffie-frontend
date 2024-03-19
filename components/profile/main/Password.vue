<script setup lang="ts">
const password = ref<string | null>("passwordword");

const handleSavePassword = () => {

}
</script>

<template>
  <label for="tel" class="profile__label">Пароль</label>
  <div class="profile__input">
    <input
        type="password"
        placeholder="Пароль"
        v-model="password"
        readonly
    >
  </div>
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
    font-family: Roboto, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &__input {
    position: relative;
    width: 100%;
    max-width: 400px;

    input {
      width: 100%;
      padding: 10px 56px;
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
      transition: all 0.15s linear;
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
    font-family: Roboto, serif;
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
  font-family: Roboto, serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
}
</style>