export const displayTime = (time) => {
    const hourTemp = parseInt(time / 3600);
    const minTemp = parseInt((time / 3600 - hourTemp) * 60);
    const secTemp = parseInt(time - hourTemp * 3600 - minTemp * 60);
    const hour = hourTemp < 10 ? "0" + hourTemp : hourTemp;
    const min = minTemp < 10 ? "0" + minTemp : minTemp;
    const sec = secTemp < 10 ? "0" + secTemp : secTemp;
    return hour + ":" + min + ":" + sec;
}
