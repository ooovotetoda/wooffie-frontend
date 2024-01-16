<script setup lang="ts">
import {$fetch} from "ofetch";

definePageMeta({
  layout: "authorization",
})

const config = useRuntimeConfig()

const password = ref<string | null>(null);
const isPasswordValid = ref<boolean>(true);

const handleSubmit = async () => {
  if (password.value === null || password.value.length < 8 || !isPasswordValid.value) {
    return
  }

  let statusCode = 0;

  try {
    await $fetch(`/api/user/password`, {
      method: "POST",
      baseURL: config.public.baseUrl,
      credentials: "include",
      body: {
        password: password.value,
      },
      onResponse(context) {
        statusCode = context.response.status
      },
    })

    if (statusCode === 200) {
      sessionStorage.clear()
      await navigateTo("/auth/signin")
    } else {
      console.log("failed change password")
    }
  } catch (e) {
    console.error(e)
  }
}

</script>

<template>
  <div class="authorization">
    <h3 class="authorization-title">Новый пароль</h3>

    <div class="authorization-hint">
      <IconsQuestion/>
      <span>Введите новый пароль</span>
    </div>

    <form @submit.prevent="handleSubmit" class="authorization-form">
      <AuthPassword
          @updatePassword="(p) => password = p"
          v-model:isPasswordValid="isPasswordValid"
      />

      <button class="authorization-login">Сохранить</button>
    </form>

    <NuxtLink to="/auth/signin">
      <button class="authorization-registration">Назад</button>
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
    font-family: Roboto, serif;
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
        font-family: Roboto, serif;
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
      font-family: Roboto, serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      cursor: pointer;
      transition: all 0.15s linear;
      background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM4OTg5ODkiIGQ9Ik02IDIycS0uODI1IDAtMS40MTMtLjU4OFQ0IDIwVjEwcTAtLjgyNS41ODgtMS40MTNUNiA4aDFWNnEwLTIuMDc1IDEuNDYzLTMuNTM4VDEyIDFxMi4wNzUgMCAzLjUzOCAxLjQ2M1QxNyA2djJoMXEuODI1IDAgMS40MTMuNTg4VDIwIDEwdjEwcTAgLjgyNS0uNTg4IDEuNDEzVDE4IDIySDZabTYtNXEuODI1IDAgMS40MTMtLjU4OFQxNCAxNXEwLS44MjUtLjU4OC0xLjQxM1QxMiAxM3EtLjgyNSAwLTEuNDEzLjU4OFQxMCAxNXEwIC44MjUuNTg4IDEuNDEzVDEyIDE3Wk05IDhoNlY2cTAtMS4yNS0uODc1LTIuMTI1VDEyIDNxLTEuMjUgMC0yLjEyNS44NzVUOSA2djJaIi8+PC9zdmc+") no-repeat 20px center;

      &:hover {
        border: 1px solid #000000;
      }

      &:focus {
        border: 1px solid $main-color;
        background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNjZjg4MDIiIGQ9Ik02IDIycS0uODI1IDAtMS40MTMtLjU4OFQ0IDIwVjEwcTAtLjgyNS41ODgtMS40MTNUNiA4aDFWNnEwLTIuMDc1IDEuNDYzLTMuNTM4VDEyIDFxMi4wNzUgMCAzLjUzOCAxLjQ2M1QxNyA2djJoMXEuODI1IDAgMS40MTMuNTg4VDIwIDEwdjEwcTAgLjgyNS0uNTg4IDEuNDEzVDE4IDIySDZabTYtNXEuODI1IDAgMS40MTMtLjU4OFQxNCAxNXEwLS44MjUtLjU4OC0xLjQxM1QxMiAxM3EtLjgyNSAwLTEuNDEzLjU4OFQxMCAxNXEwIC44MjUuNTg4IDEuNDEzVDEyIDE3Wk05IDhoNlY2cTAtMS4yNS0uODc1LTIuMTI1VDEyIDNxLTEuMjUgMC0yLjEyNS44NzVUOSA2djJaIi8+PC9zdmc+") no-repeat 20px center;
      }
    }
  }

  &-hint {
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
    color: $dark-grey;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    transition: all 0.15s ease-in-out;

    span {
      text-decoration: none;
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
    font-family: Roboto, serif;
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
    font-family: Roboto, serif;
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
    font-family: Roboto, serif;
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