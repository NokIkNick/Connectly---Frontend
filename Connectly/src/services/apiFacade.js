
export function formatDate(createdDate){
    const [year,month,day,hours,minutes,seconds,milliseconds] = createdDate;
    const dateObject = new Date(year,month -1 ,day,hours+2,minutes,seconds);
    return dateObject.toLocaleString('da-DK');

}

export const fetchFeedData = async(catagory) =>{
    try{
        const response = await fetch(`/testData.json`)
        const data = await response.json();
        console.log(data, "data in fetchFeedData");
        return data;
    }catch(error){
        console.error('fetching data error',error);
    }
}

