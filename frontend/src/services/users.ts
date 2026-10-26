import {getAuthToken} from "@/utils/token";
import {User} from "@/types/user";
import appConfig from "@/config/app";


export const getUsers = async () => {
    try {
        const response = await fetch(`${appConfig.BASE_URL}/users`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });

        const result = await response.json();

        if (!result?.success) {
            throw new Error(result?.message || "Users fetch filed");
        }

        return {
            success: true,
            message: result?.message ?? "Users fetch successful",
            data: result.data as User[],
        };
    } catch (err) {
        return {
            success: false,
            message: err instanceof Error ? err.message : "Users fetch filed",
        };
    }
};