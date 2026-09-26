import { LoginDataType } from "@/types/auth";
import { User } from "@/types/user";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";

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

export const logout = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    const result = await response.json();

    if (!result?.success) {
      throw new Error(result?.message || "Logout filed");
    }

    return {
      success: true,
      message: result?.message ?? "Logout successful",
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Logout failed",
    };
  }
};

export const myProfile = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    const result = await response.json();

    if (!result?.success) {
      throw new Error(result?.message || "Profile fetch filed");
    }

    return {
      success: true,
      message: result?.message ?? "Profile fetch successful",
      data: result.data as User,
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Profile fetch filed",
    };
  }
};
