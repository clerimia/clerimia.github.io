// Date formatting adapted from Astro Pure 1.4.7 (CWorld), Apache-2.0.
// Modified to use local configuration.
import config from '@/site-config'

export { cn } from '@/lib/utils'

const dateFormat = new Intl.DateTimeFormat(config.locale.dateLocale, config.locale.dateOptions)

export function getFormattedDate(date: string | number | Date, options?: Intl.DateTimeFormatOptions) {
  if (options) {
    return new Date(date).toLocaleDateString(config.locale.dateLocale, {
      ...config.locale.dateOptions,
      ...options
    })
  }
  return dateFormat.format(new Date(date))
}

export function showToast(detail: { message: string; time?: number }) {
  document.dispatchEvent(new CustomEvent('toast', { detail }))
}
