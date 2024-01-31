import { ref, watchEffect } from 'vue'

export default () => {
  type Theme = 'business' | 'lemonade' | 'coffee'
  const currentTheme = ref<Theme>('business')

  const setDefaultTheme = () => {
    currentTheme.value = 'business'
  }

  const setAltTheme = () => {
    currentTheme.value = 'coffee'
  }

  watchEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', currentTheme.value)
  })

  return {
    setDefaultTheme,
    setAltTheme
  }
}
