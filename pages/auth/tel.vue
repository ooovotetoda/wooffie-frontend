<script setup lang="ts">
import sendOTP from "~/utils/sendOTP";

definePageMeta({
  layout: "authorization",
})

const phone = ref<string | null>(null);
const isPhoneValid = ref<boolean>(true);

const authStorage = useSessionStorage("auth-store", { phone: "+79999999999", password: "", timer: "00" })

const handleSubmit = async () => {
  if (phone.value === null || !isPhoneValid.value) {
    return
  }

  authStorage.value.phone = phone.value

  const status = await sendOTP(phone.value)

  if (status === "OK") {
    await navigateTo({
      path: "/auth/code",
      query: {
        type: "reset"
      }
    })
  } else {
    console.log("failed to send OTP code")
  }
}

</script>

<template>
  <div class="authorization">
    <h3 class="authorization-title">Восстановление пароля</h3>

    <div class="authorization-hint">
      <IconsQuestion/>
      <span>Введите  номер телефона, на который будет отправлен одноразовый код</span>
    </div>

    <form @submit.prevent="handleSubmit" class="authorization-form">
      <AuthPhone
          @updatePhone="(p) => phone = p"
          v-model:isPhoneValid = isPhoneValid
      />

      <button class="authorization-login">Отправить код</button>
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
      background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM4OTg5ODkiIGQ9Ik0xOS45NSAyMXEtMy4xMjUgMC02LjE4Ny0xLjM1VDguMiAxNS44cS0yLjUtMi41LTMuODUtNS41NVQzIDQuMDVWM2g1LjlsLjkyNSA1LjAyNWwtMi44NSAyLjg3NXEuNTUuOTc1IDEuMjI1IDEuODV0MS40NSAxLjYyNXEuNzI1LjcyNSAxLjU4OCAxLjM4OFQxMy4xIDE3bDIuOS0yLjlsNSAxLjAyNVYyMWgtMS4wNVoiLz48L3N2Zz4=") no-repeat 20px center;
      transition: all 0.15s linear;

      &:hover {
        border: 1px solid #000000;
      }

      &:focus {
        border: 1px solid $main-color;
        background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNjZjg4MDIiIGQ9Ik0xOS45NSAyMXEtMy4xMjUgMC02LjE3NS0xLjM2M3QtNS41NS0zLjg2MnEtMi41LTIuNS0zLjg2Mi01LjU1VDMgNC4wNXEwLS40NS4zLS43NXQuNzUtLjNIOC4xcS4zNSAwIC42MjUuMjM4dC4zMjUuNTYybC42NSAzLjVxLjA1LjQtLjAyNS42NzVUOS40IDguNDVMNi45NzUgMTAuOXEuNS45MjUgMS4xODcgMS43ODd0MS41MTMgMS42NjNxLjc3NS43NzUgMS42MjUgMS40MzhUMTMuMSAxN2wyLjM1LTIuMzVxLjIyNS0uMjI1LjU4OC0uMzM4dC43MTItLjA2MmwzLjQ1LjdxLjM1LjEuNTc1LjM2M1QyMSAxNS45djQuMDVxMCAuNDUtLjMuNzV0LS43NS4zWiIvPjwvc3ZnPg==") no-repeat 20px center;
      }
    }
  }

  &-hint {
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
    text-align: left;
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