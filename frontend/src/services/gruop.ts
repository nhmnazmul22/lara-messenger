import appConfig from "@/config/app";
import { Group } from "@/types/group";
import { getAuthToken } from "@/utils/token";

export const createNewGroup = async (data: FormData) => {
  try {
    const response = await fetch(`${appConfig.BASE_URL}/groups`, {
      method: "POST",
      body: data,
      headers: {
        // "Content-type": "multipart/form-data",
        Accept: "application/json",
      },
    });

    const result = await response.json();

    if (!result?.success) {
      throw new Error(result?.message || "Group create filed");
    }

    return {
      success: true,
      message: result?.message ?? "Group create successful",
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Group create failed",
    };
  }
};

export const getAllGroups = async () => {
  try {
    const response = await fetch(`${appConfig.BASE_URL}/groups`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    const result = await response.json();

    if (!result?.success) {
      throw new Error(result?.message || "Groups fetch filed");
    }
    return {
      success: true,
      message: result?.message ?? "Groups fetch successful",
      data: result.data as Group[],
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Groups fetch filed",
    };
  }
};

export const addNewMember = async (
  groupId: number,
  data: { usersIds: number[] },
) => {
  try {
    const response = await fetch(
      `${appConfig.BASE_URL}/groups/add-member/${groupId}`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          // "Content-type": "multipart/form-data",
          Accept: "application/json",
        },
      },
    );

    const result = await response.json();

    if (!result?.success) {
      throw new Error(result?.message || "Failed to add member in group");
    }

    return {
      success: true,
      message: result?.message ?? "Successfully added member in group",
    };
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error ? err.message : "Failed to add member in group",
    };
  }
};
