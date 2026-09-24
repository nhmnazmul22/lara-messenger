import { LoginDataType } from "@/types/auth";

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

export const loginUser = async (data: LoginDataType) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    const result = await response.json();

    if (!result?.success) {
      throw new Error(result?.message || "Login filed");
    }

    return {
      success: true,
      message: result?.message ?? "Login successful",
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Login failed",
    };
  }
};
