import {ofetch} from "ofetch";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const user = "myuser"
    const password = "mypass"

    const encodedCredentials = btoa(`${user}:${password}`);

    const instance = ofetch.create({
        baseURL: config.public.baseURL ?? "http://localhost:8080",
        headers: {
            Accept: 'application/json',
            Authorization: `Basic ${encodedCredentials}`,
        }
    })

    return {
        provide: {
            ofetch: instance
        }
    }
})