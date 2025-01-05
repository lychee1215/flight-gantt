export const getLastHourTime = (timestamp: number) => {
    const date = new Date(timestamp);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
}

export const getRandomLightHexColor = () => {
    const r = Math.floor(Math.random() * 75 + 180).toString(16).padStart(2, '0');
    const g = Math.floor(Math.random() * 75 + 180).toString(16).padStart(2, '0');
    const b = Math.floor(Math.random() * 75 + 180).toString(16).padStart(2, '0');

    return `#${r}${g}${b}`;
}