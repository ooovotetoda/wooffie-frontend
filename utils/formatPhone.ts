export default function (phone: string | null): string | null {
    if (!phone) {
        return null
    }

    const regex = /^(?:\+7|8)?(\d{3})(\d{3})(\d{2})(\d{2})$/;
    const match = phone.match(regex);

    if (match) {
        return `+7 (${match[1]}) ${match[2]}-${match[3]}-${match[4]}`;
    } else {
        return phone;
    }
}