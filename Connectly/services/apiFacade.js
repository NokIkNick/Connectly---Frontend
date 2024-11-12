import {BASE_URL} from "../utils/globalVariables.js"

//Get from api mockup, with retries and timeout. Stolen from Yapp, but with more failsafes and error handling. Needs to be reworked to fit our api.
//Fetch with timeout, to avoid hanging fetches.
//Returns a promise that resolves when the fetch is done, or rejects if it takes
//longer than the timeout.

//All URL's are public and should be reworked to be private.

const fetchWithTimeout = (url, options, timeout = 5000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), timeout)
        )
    ]);
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
    const url = `${BASE_URL}/public/getProfile/${id}`;
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
    }
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

