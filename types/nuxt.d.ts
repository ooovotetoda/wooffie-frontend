import { OfetchInstance } from 'ofetch';

declare module '#app' {
    interface NuxtApp {
        $ofetch: OfetchInstance;
    }
}
