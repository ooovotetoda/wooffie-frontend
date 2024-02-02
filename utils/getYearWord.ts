export default function (num: number | undefined): string {
    if (!num) {
        return "лет"
    }

    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return 'лет';
    } else if (lastDigit === 1) {
        return 'год';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        return 'года';
    } else {
        return 'лет';
    }
}
