import { createPinia } from 'pinia'
import { PiniaLogger } from 'pinia-logger'

export const pinia = createPinia()
pinia.use(
    PiniaLogger({
        expanded: false,
        disabled: process.env.MODE === 'production',
    })
)

export * from './ui'
export * from './windows'
