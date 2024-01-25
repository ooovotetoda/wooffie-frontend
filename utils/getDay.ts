export default function (): number {
    let today = new Date();
    let day = today.getDay();
    return (day + 6) % 7
}