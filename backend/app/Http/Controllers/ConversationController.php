<?php

namespace App\Http\Controllers;

use App\Http\Resources\Conversation\ConversationResource;
use App\Services\ConversationService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ConversationController extends Controller
{

    public function __construct(protected ConversationService $conversationService)
    {
    }

    /**
     * Conversations collection
     * Route: /api/conversations
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $result = $this->conversationService->getAllConversations();

        return $this->sendSuccessResponse(
            'User retrieved successful',
            ConversationResource::collection($result),
        );
    }

    /**
     * Create Conversation
     * Route: /api/conversations/{receiverId}
     * @param Request $request
     * @param int $receiverId
     * @return JsonResponse
     * @throws Exception
     */

    public function getConversation(Request $request, int $receiverId): JsonResponse
    {
        $result = $this->conversationService->findOrCreateConversation($receiverId);

        return $this->sendSuccessResponse(
            'Conversation retrieved successful',
            new ConversationResource($result),
        );
    }
}
