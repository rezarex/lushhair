//DEV
// export const API_BASE_URL = 'https://lushapi.onrender.com/api'; 
// export const CHAT_API_BASE_URL = 'https://lushapi.onrender.com';
export const CHAT_API_BASE_URL = process.env.CHAT_API_BASE_URL; 
export const API_BASE_URL = process.env.API_BASE_URL;
export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
// export { API_BASE_URL };

// --- Chat Configuration ---
export const CHAT_CONFIG = {
    // API Endpoints
    CHAT_HISTORY: `${API_BASE_URL}/chat/history`, 
    SERVER_URL: `${API_BASE_URL}`,
    MARK_READ_URL: `${API_BASE_URL}/chat/mark-read`, 
    TYPING_STATUS_URL: `${API_BASE_URL}/chat/typing`, 
    POST_MESSAGE_URL: `${API_BASE_URL}/chat/admin`,
    CLIENT_MESSAGE_URL: `${API_BASE_URL}/chat/client`, // Explicit post endpoint

    // Polling Intervals (in milliseconds)
    CHAT_POLLING_INTERVAL: 15000, // General chat refresh (15 seconds)
    TYPING_POLLING_INTERVAL: 3000,  // Typing status refresh (3 seconds)
};
//PROD


// export { API_BASE_URL };
