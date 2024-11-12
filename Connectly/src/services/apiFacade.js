
export function formatDate(createdDate){
    const [year,month,day,hours,minutes,seconds,milliseconds] = createdDate;
    const dateObject = new Date(year,month -1 ,day,hours+2,minutes,seconds);
    return dateObject.toLocaleString('da-DK');

}