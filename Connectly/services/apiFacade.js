import {BASE_URL} from "../utils/globalVariables.js"

//Get from api mockup, with retries and timeout. Stolen from Yapp, but with more failsafes and error handling. Needs to be reworked to fit our api.

const fetchWithTimeout = (url, options, timeout = 5000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), timeout)
        )
    ]);
};

export const fetchThreads = async (retries = 3) => {
    const url = `${BASE_URL}/public/getAllThreads`;
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
                throw new Error(`Failed to fetch threads: ${error.message}`);
            }
        }
    }
};


