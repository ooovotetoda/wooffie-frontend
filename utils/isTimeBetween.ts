export default function (startTimeString: string, endTimeString: string): boolean {
    function createTime(dateString: string): Date {
        return new Date('1970-01-01T' + dateString);
    }

    let startTime: Date = createTime(startTimeString);
    let endTime: Date = createTime(endTimeString);

    let currentTime: Date = new Date();
    currentTime.setFullYear(1970, 0, 1);

    return currentTime >= startTime && currentTime <= endTime;
}