import { FromDataType } from "@/types/auth";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api";

export const registerUser = async (data: FromDataType) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
      //   "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Registration filed");
    }
    const result = await response.json();

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
