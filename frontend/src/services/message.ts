import appConfig from "@/config/app";
import { Message } from "@/types/message";
import { getAuthToken } from "@/utils/token";

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
