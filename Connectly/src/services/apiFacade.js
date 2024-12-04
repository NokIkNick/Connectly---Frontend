import {BASE_URL} from "../utils/globalVariables.js"

//Get from api mockup, with retries and timeout. Stolen from Yapp, but with more failsafes and error handling. Needs to be reworked to fit our api.
//Fetch with timeout, to avoid hanging fetches.
//Returns a promise that resolves when the fetch is done, or rejects if it takes
//longer than the timeout.

//All URL's are public and should be reworked to be private.


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



const fetchWithTimeout = (url, options, timeout = 5000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), timeout)
        )
    ]);
};

//mock implemnation for blocking
export const blockUser = async(email) => {
    try{
        const response = await fetch(`${BASE_URL}/api/block`,{
            method:'post',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({email}),
        }
        );
        if(!response.ok){
            throw new Error('couldnt block this guy');
        }
        return await response.json();
    }catch(error){
        throw new Error('Error blocking user:' + error.message);
    }
}

//login function
export const login = async (credentials, retries = 3) => {
    const url = `${BASE_URL}/auth/login`;
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    };

    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetchWithTimeout(url, options);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            if(!data.token){
                throw new Error("Invalid credentials. Try again");
            }
            return data;

        } catch (error) {
            if (i === retries - 1) {
                throw new Error(`Failed to log in: ${error.message}`);
            }
        }
    };
};

//register function
export const register = async (credentials, retries = 3) => {
    JSON.stringify(credentials);
    const url = `${BASE_URL}/auth/register`;
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    };

    for (let i = 0; i < retries; i++) {
        console.log("registering");
        try {
            const response = await fetchWithTimeout(url, options);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            if(!data.token){
                throw new Error("Invalid credentials. Try again");
            }
            return data;

        } catch (error) {
            if (i === retries - 1) {
                throw new Error(`Failed to register: ${error.message}`);
            }
        }
    }
};

//Fetches all profiles from the api.
//Returns an array of profiles.
export const getAllProfiles = async (retries = 3) => {

    
    const url = `${BASE_URL}/public/getAllProfiles`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };

    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetchWithTimeout(url, options);

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();

            // Validate data (example: check if it's an array)
            if (!Array.isArray(data)) {
                throw new Error("Invalid data format");
            }

            return data;
        } catch (error) {
            if (i === retries - 1) {
                throw new Error(`Failed to get all profiles: ${error.message}`);
            }
        }
    }
};


//Currently ID is email, but should be changed to something else.
//Fethces a single profile.
export const getProfile = async (id, retries = 3) => {
    const response = await fetch("/TestSearchData.json");
    const data = await response.json();
    const profiles = data.filter(profile => profile.fullName.includes(id));
    if (profiles.length === 0) {
        throw new Error("No profiles found");
    }
    return profiles;

    /*const url = `${BASE_URL}/public/getProfile/${id}`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };

    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetchWithTimeout(url, options);

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();

            // Validate data (example: check if it's an object)
            if (typeof data !== "object" || data === null) {
                throw new Error("Invalid data format");
            }

            return data;
        } catch (error) {
            if (i === retries - 1) {
                throw new Error(`Failed to get profile: ${error.message}`);
            }
        }
    } */
};

//Searches for profiles based on a query.
//Returns an array of profiles.
export const searchProfiles = async (query, retries = 3) => {
    const url = `${BASE_URL}/public/searchProfiles?query=${encodeURIComponent(query)}`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };

    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetchWithTimeout(url, options);

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();

            // Validate data (example: check if it's an array)
            if (!Array.isArray(data)) {
                throw new Error("Invalid data format");
            }

            return data;
        } catch (error) {
            if (i === retries - 1) {
                throw new Error(`Failed to search profiles: ${error.message}`);
            }
        }
    }
};




// send message
export const sendMessage = async (message, retries = 3) => {
    const url = `${BASE_URL}/private/sendMessage`;
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    };

    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetchWithTimeout(url, options);

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            return true;
        } catch (error) {
            if (i === retries - 1) {
                throw new Error(`Failed to send message: ${error.message}`);
            }
        }
    }
};

//ask for connnection 
//Not finished and needs a revision.

/* export const askForConnection = async (id, retries = 3) => {
    const url = `${BASE_URL}/private/askForConnection/${id}`;
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    };

    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetchWithTimeout(url, options);

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            return true;
        } catch (error) {
            if (i === retries - 1) {
                throw new Error(`Failed to ask for connection: ${error.message}`);
            }
        }
    }
} */

