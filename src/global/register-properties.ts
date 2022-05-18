import { App } from 'vue'
import { formatUtcString } from '@/utils/data-format'
export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(val: string): string {
      return formatUtcString(val)
    }
  }
}
