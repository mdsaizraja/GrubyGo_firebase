
import axios from "axios";
import { BASE_URL } from "./config";
import { zustandStorage } from "../state/storage";
import { getFirebaseIdToken } from "../utils/auth";

export const customerLogin = async (phone: string) => {
    try {
        // First, get the Firebase ID token from the signed-in user.
        const idToken = await getFirebaseIdToken();

        // Now, send the login request to your backend with the token.
        const response = await axios.post(`${BASE_URL}/customer/login`, 
            { phone }, 
            {
                headers: {
                    // The backend will verify this token.
                    Authorization: `Bearer ${idToken}`
                }
            }
        );
        
        const { accessToken, refreshToken, customer } = response.data;

        // Store the tokens your backend provides for future API calls.
        await zustandStorage.setItem("accessToken", accessToken);
        await zustandStorage.setItem("refreshToken", refreshToken);

        return customer;

    } catch (error) {
        console.log("Login Error", JSON.stringify(error));
        // It's helpful to see the error details in the console.
        if (error.response) {
            console.error("Error response:", error.response.data);
        }
        throw error;
    }
};
