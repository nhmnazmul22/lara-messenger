import { json } from "stream/consumers";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api";

export const registerUser = async (data: FormData) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      body: data,
      headers: {
        // "Content-type": "multipart/form-data",
        Accept: "application/json",
      },
    });

    const result = await response.json();

    if (!result?.success) {
      throw new Error(result?.message || "Registration filed");
    }

    return {
      success: true,
      message: result?.message ?? "Registration successful",
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Registration failed",
    };
  }
};
