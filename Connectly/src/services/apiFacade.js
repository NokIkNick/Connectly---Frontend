
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

export const fetchNotifications = async () => {
    try {
        const response = await fetch('/notifications.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
};

export const fetchPostsByCategory = async (category) => {
    try {
        const response = await fetch(`/api/posts?category=${category}`, {
            method: 'POST',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching posts by category:', error);
        throw error;
    }
};