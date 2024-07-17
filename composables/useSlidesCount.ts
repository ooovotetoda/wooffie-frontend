export function useSlidesCount(width: number, margin: number) {
  const { width: windowWidth } = useWindowSize();

  const count = computed(() => {
    const res = (windowWidth.value - 2 * margin) / width;
    return res > 3 ? 3 : res;
  });

  return { count };
}
