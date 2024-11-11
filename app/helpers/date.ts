export function getDateString() {
    const date = new Date();
    
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth()+1).padStart(2,'0');
    const day = String(date.getDay()+1).padStart(2,'0');

    const hours = String(date.getHours()+1).padStart(2,'0');
    const minutes = String(date.getMinutes()+1).padStart(2,'0');
    const seconds = String(date.getSeconds()+1).padStart(2,'0');


    return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
}

export function convertDateTime(datetime: string) {
    const dateTimeArr = datetime.split(" ");
    const date = dateTimeArr[0].replaceAll('-','/');
    const [hours, minutes, seconds] = dateTimeArr[1].split(':').map(Number);
    const tempdate = new Date();
    tempdate.setHours(hours, minutes, seconds);
    
    const time = tempdate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    });

    return date+' '+time;
}