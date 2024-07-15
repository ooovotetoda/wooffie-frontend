import type {Ref} from "vue";

export function useCodeTimer(isCodeSent: Ref) {
  const timerStorage = useSessionStorage("auth-store", { timer: "00" })

  const timer = ref<number>(59);
  let timerInterval: ReturnType<typeof setInterval> | null = null;

  const startTimer = (duration: number): void => {
    isCodeSent.value = true;
    timer.value = Math.floor(duration / 1000);

    timerInterval = setInterval(() => {
      if (timer.value > 0) {
        timer.value--;
      } else {
        clearInterval(timerInterval as NodeJS.Timeout);
        isCodeSent.value = false;
        timerStorage.value.timer = ""
        timerInterval = null;
      }
    }, 1000);
  }

  const resetTimer = (): void => {
    const now = Date.now();
    const timerDuration = 59000;
    timerStorage.value.timer = (now + timerDuration).toString()
  }

  onMounted(() => {
    const now = Date.now();
    let timerEnd = parseInt(timerStorage.value.timer || '0');

    if (!timerEnd) {
      const timerDuration = 59000; // 59 секунд
      timerEnd = now + timerDuration;
      timerStorage.value.timer = timerEnd.toString()
      startTimer(timerDuration);
    } else if (timerEnd > now) {
      startTimer(timerEnd - now);
    } else {
      timerStorage.value.timer = ""
    }
  });

  onUnmounted(() => {
    if (timerInterval) {
      clearInterval(timerInterval as NodeJS.Timeout);
    }
  });

  return { timer, timerInterval, startTimer, resetTimer }
}
