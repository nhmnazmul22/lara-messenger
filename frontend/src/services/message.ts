import appConfig from "@/config/app";
import { Message } from "@/types/message";
import { getAuthToken } from "@/utils/token";

type SendMessageResult =
  | { success: true; message: string; data: Message }
  | { success: false; message: string };

export const getMessagesByConversation = async (conversationId: number) => {
  try {
    const response = await fetch(
      `${appConfig.BASE_URL}/messages/${conversationId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
      },
    );

    const result = await response.json();

    if (!result?.success) {
      throw new Error(result?.message || "Messages fetch filed");
    }
    return {
      success: true,
      message: result?.message ?? "Messages fetch successful",
      data: result.data as Message[],
      meta: result?.meta ?? null,
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Messages fetch filed",
    };
  }
};

export const getMessagesByGroup = async (groupId: number) => {
  try {
    const response = await fetch(
      `${appConfig.BASE_URL}/messages/group/${groupId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
      },
    );

    const result = await response.json();

    if (!result?.success) {
      throw new Error(result?.message || "Group messages fetch filed");
    }
    return {
      success: true,
      message: result?.message ?? "Group messages fetch successful",
      data: result.data as Message[],
      meta: result?.meta ?? null,
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Group messages fetch filed",
    };
  }
};

export const sendMessage = async (
  data: FormData,
): Promise<SendMessageResult> => {
  try {
    const response = await fetch(`${appConfig.BASE_URL}/messages/send`, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    const result = await response.json();

    if (!result?.success) {
      throw new Error(result?.message || "Message send filed");
    }

    return {
      success: true,
      message: result?.message ?? "Message send successful",
      data: result.data as Message
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Message send failed",
    };
  }
};
