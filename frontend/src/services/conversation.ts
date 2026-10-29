import appConfig from "@/config/app";
import { getAuthToken } from "@/utils/token";
import { conversation, ConversationWithMessages } from "@/types/conversation";

export const startConversation = async (receiverId: number) => {
  try {
    const response = await fetch(
      `${appConfig.BASE_URL}/conversations/${receiverId}`,
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
      throw new Error(result?.message || "Conversation fetch filed");
    }
    return {
      success: true,
      message: result?.message ?? "Conversation fetch successful",
      data: result.data as ConversationWithMessages,
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Conversation fetch filed",
    };
  }
};

export const getAllConversations = async () => {
  try {
    const response = await fetch(`${appConfig.BASE_URL}/conversations`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    const result = await response.json();

    if (!result?.success) {
      throw new Error(result?.message || "Conversations fetch filed");
    }
    return {
      success: true,
      message: result?.message ?? "Conversations fetch successful",
      data: result.data as conversation[],
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Conversations fetch filed",
    };
  }
};
