import {ofetch} from "ofetch";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const encodedCredentials = btoa(`${config.apiUser}:${config.apiPassword}`);

    const instance = ofetch.create({
        baseURL: config.baseURL ?? "http://localhost:8080",
        headers: {
            Accept: 'application/json',
            Authorization: `Basic ${encodedCredentials}`,
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