<script setup lang="ts">
definePageMeta({
  layout: "authorization",
})

const route = useRoute()
const code:Ref = ref<string | null>(null)
const isCodeSent = ref<boolean>(false);
const isCodeFocused = ref<boolean>(false);
const isCodeValid = ref<boolean>(true);
const timer = ref<number>(59);
let timerInterval: ReturnType<typeof setInterval> | null = null;


function formatTel(tel: string | string[] | undefined): string | null {
  if (typeof tel !== 'string') return null;
  const cleaned = tel.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);

  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
  }

  return null;
}


const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement | null;
  if (!input) return;
  let value = input.value;
  let maxLength = 6;
  if (value.length > maxLength) {
    input.value = value.slice(0, maxLength);
  }
}

const handleFocus = (event: FocusEvent) => {
  isCodeFocused.value = true;

  const target = event.target as HTMLInputElement;
  target.placeholder = "";
}

const handleBlur = (event: FocusEvent) => {
  const target = event.target as HTMLInputElement;
  target.placeholder = "Одноразовый код";

  isCodeFocused.value = false;
}

const handleSubmit = () => {
  if (!code.value || code.value.toString().length < 6) {
    isCodeValid.value = false;
    return;
  }

  navigateTo("/auth/newpass");
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
      localStorage.removeItem("timerEnd");
      timerInterval = null;
    }
  }, 1000);
}

const initializeTimer = (): void => {
  const now = Date.now();
  let timerEnd = parseInt(localStorage.getItem("timerEnd") || '0');

  if (!timerEnd) {
    const timerDuration = 59000; // 59 секунд
    timerEnd = now + timerDuration;
    localStorage.setItem("timerEnd", timerEnd.toString());
    startTimer(timerDuration);
  } else if (timerEnd > now) {
    startTimer(timerEnd - now);
  } else {
    localStorage.removeItem("timerEnd");
  }
}

const resendCode = (): void => {
  if (isCodeSent.value) return;

  const now = Date.now();
  const timerDuration = 59000; // 59 секунд
  localStorage.setItem("timerEnd", (now + timerDuration).toString());

  startTimer(timerDuration);
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
  <div class="authorization">
    <h3 class="authorization-title">Одноразовый код</h3>

    <div class="authorization-hint">
      <IconsQuestion/>
      <span>На номер {{formatTel(route.query.tel)}} отправлен одноразовый код </span>
    </div>

    <form @submit.prevent="handleSubmit" class="authorization-form">
      <fieldset>
        <Transition name="fade">
          <legend v-if="isCodeFocused">Одноразовый код</legend>
        </Transition>
        <input
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
          type="number"
          maxlength=6
          placeholder="Одноразовый код"
          v-model="code"
        >
      </fieldset>
      <p v-if="!isCodeValid" class="authorization-error">Неверный формат</p>


      <button class="authorization-login">Подвердить</button>
    </form>

    <button @click="resendCode" :disabled="isCodeSent" class="authorization-registration">
      <span v-if="!isCodeSent">Отправить код</span>
      <span v-else>Повторно отправить {{`0:${timer}`}}</span>
    </button>
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
      background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM4OTg5ODkiIGQ9Ik03IDE1cS0xLjI1IDAtMi4xMjUtLjg3NVQ0IDEycTAtMS4yNS44NzUtMi4xMjVUNyA5cTEuMjUgMCAyLjEyNS44NzVUMTAgMTJxMCAxLjI1LS44NzUgMi4xMjVUNyAxNVptMCAzcTEuOTI1IDAgMy40NzUtMS4xVDEyLjY1IDE0SDEzbDEuMyAxLjNxLjE1LjE1LjMyNS4yMTJ0LjM3NS4wNjNxLjIgMCAuMzc1LS4wNjN0LjMyNS0uMjEyTDE3IDE0bDEuNzUgMS4zNzVxLjE1LjEyNS4zMzguMTg3dC4zODcuMDM4cS4yLS4wMjUuMzYzLS4xMTJ0LjI4Ny0uMjM4bDIuMjUtMi41NzVxLjEyNS0uMTUuMTg4LS4zMjV0LjA2Mi0uMzc1cTAtLjItLjA3NS0uMzYydC0uMi0uMjg4TDIxLjMyNSAxMC4zcS0uMTUtLjE1LS4zMzctLjIyNVQyMC42IDEwaC03Ljk1cS0uNi0xLjctMi4xMTMtMi44NVQ3IDZRNC41IDYgMi43NSA3Ljc1VDEgMTJxMCAyLjUgMS43NSA0LjI1VDcgMThaIi8+PC9zdmc+") no-repeat 20px center;
      transition: all 0.15s linear;
      
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &[type=number] {
        -moz-appearance: textfield;
      }

      &:hover {
        border: 1px solid #000000;
      }

      &:focus {
        border: 1px solid $main-color;
        background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNjZjg4MDIiIGQ9Ik03IDE1cS0xLjI1IDAtMi4xMjUtLjg3NVQ0IDEycTAtMS4yNS44NzUtMi4xMjVUNyA5cTEuMjUgMCAyLjEyNS44NzVUMTAgMTJxMCAxLjI1LS44NzUgMi4xMjVUNyAxNVptMCAzcTEuOTI1IDAgMy40NzUtMS4xVDEyLjY1IDE0SDEzbDEuMyAxLjNxLjE1LjE1LjMyNS4yMTJ0LjM3NS4wNjNxLjIgMCAuMzc1LS4wNjN0LjMyNS0uMjEyTDE3IDE0bDEuNzUgMS4zNzVxLjE1LjEyNS4zMzguMTg3dC4zODcuMDM4cS4yLS4wMjUuMzYzLS4xMTJ0LjI4Ny0uMjM4bDIuMjUtMi41NzVxLjEyNS0uMTUuMTg4LS4zMjV0LjA2Mi0uMzc1cTAtLjItLjA3NS0uMzYydC0uMi0uMjg4TDIxLjMyNSAxMC4zcS0uMTUtLjE1LS4zMzctLjIyNVQyMC42IDEwaC03Ljk1cS0uNi0xLjctMi4xMTMtMi44NVQ3IDZRNC41IDYgMi43NSA3Ljc1VDEgMTJxMCAyLjUgMS43NSA0LjI1VDcgMThaIi8+PC9zdmc+") no-repeat 20px center;
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
    font-family: Roboto;
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
    color: $dark-grey;
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