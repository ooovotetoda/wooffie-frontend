interface IWidths {
  mobile: number;
  desktop: number;
}

export function useSlidesCount(widths: IWidths | number, margin: number) {
  const { width: windowWidth } = useWindowSize()

  const width = computed(() => {
    if (typeof widths !== 'number') {
      return windowWidth.value < 640 ? widths.mobile : widths.desktop
    }

    return widths
  })

  const count = computed(() => {
    const res = (windowWidth.value - 2 * margin) / width.value
    return res > 3 ? 3 : res
  })

  return { count, width }
}
