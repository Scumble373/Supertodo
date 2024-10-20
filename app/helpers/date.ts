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