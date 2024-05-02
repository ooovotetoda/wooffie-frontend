<script setup lang="ts">
import {useUserStore} from "~/stores/userStore";
import {formatPhone} from "../../.nuxt/imports";

definePageMeta({
  layout: "authorization",
})

const { signUp } = useUserStore()

const authStorage = useSessionStorage("auth-store", { phone: "+79999999999", password: "", timer: "00" })

const phone = authStorage.value.phone

const route = useRoute()
const code = ref<string | null>(null)
const isCodeSent = ref<boolean>(false);
const isCodeValid = ref<boolean>(true);
const timer = ref<number>(59);
let timerInterval: ReturnType<typeof setInterval> | null = null;

const handleSubmit = async () => {
  if (!code.value || code.value.length < 4) {
    isCodeValid.value = false;
    return;
  }

  const password = authStorage.value.password

  const isValid = await validateOTP(code.value)
  if (isValid) {
    if (route.query.type === "register") {
      if (!password) {
        return
      }

      await signUp(password)
      await navigateTo("/")
    } else if (route.query.type === "reset") {
      await navigateTo("/auth/newpass");
    }
  } else {
    console.log("code not valid")
  }
}

const resendCode = async () => {
  if (isCodeSent.value) return;

  const now = Date.now();
  const timerDuration = 59000; // 59 секунд
  authStorage.value.timer = (now + timerDuration).toString()

  startTimer(timerDuration);

  if (phone) {
    await sendOTP(phone)
  } else {
    console.error("invalid phone number")
  }
}

const startTimer = (duration: number): void => {
  isCodeSent.value = true;
  timer.value = Math.floor(duration / 1000);

  timerInterval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      clearInterval(timerInterval as NodeJS.Timeout);
      isCodeSent.value = false;
      authStorage.value.timer = ""
      timerInterval = null;
    }
  }, 1000);
}

const initializeTimer = (): void => {
  const now = Date.now();
  let timerEnd = parseInt(authStorage.value.timer || '0');

  if (!timerEnd) {
    const timerDuration = 59000; // 59 секунд
    timerEnd = now + timerDuration;
    authStorage.value.timer = timerEnd.toString()
    startTimer(timerDuration);
  } else if (timerEnd > now) {
    startTimer(timerEnd - now);
  } else {
    authStorage.value.timer = ""
  }
}

onMounted(() => {
  initializeTimer();
});

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval as NodeJS.Timeout);
  }
});
</script>

<template>
  <AuthBlock>
    <template v-slot:title>Одноразовый код</template>

    <div class="authorization-hint">
      <IconsQuestion/>
      <span>На номер {{formatPhone(phone)}} отправлен одноразовый код </span>
    </div>

    <form @submit.prevent="handleSubmit" class="authorization-form">
      <AuthCode
          @updateCode="(c) => code = c"
          v-model:isCodeValid="isCodeValid"
      />

      <button class="authorization-login">Подтвердить</button>
    </form>

    <button @click="resendCode" :disabled="isCodeSent" class="authorization-registration">
      <span v-if="!isCodeSent">Отправить код</span>
      <span v-else>Повторно отправить {{`0:${timer}`}}</span>
    </button>
  </AuthBlock>
</template>

<style scoped lang="scss">
.authorization {
  text-align: center;

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
    color: $dark-grey;
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
}
</style>