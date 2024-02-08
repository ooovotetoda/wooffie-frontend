import {ofetch} from "ofetch";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const instance = ofetch.create({
        baseURL: config.public.baseUrl ?? "http://localhost:8080",
        headers: {
            Accept: 'application/json'
        }
    })

    // You can also just do this instead of returning
    // nuxtApp.provide('ofetch', instance)

    return {
        provide: {
            ofetch: instance
        }
    }
})