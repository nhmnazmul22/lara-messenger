<?php

namespace App\Http\Controllers;

use App\Http\Requests\Conversation\ConversationStoreRequest;
use App\Http\Resources\Conversation\ConversationResource;
use App\Services\ConversationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ConversationController extends Controller
{

    public  function __construct(protected ConversationService $conversationService) {}

    /**
     * Conversations collection
     * Route: /api/conversations
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $result = $this->conversationService->getAllConversations();

        return $this->sendSuccessResponse(
            'User retrieved successful',
            ConversationResource::collection($result),
            Response::HTTP_OK
        );
    }

    /**
     * Create Conversation
     * Route: /api/conversations/{receiverId}
     * @return JsonResponse
     */

    public function getConversation(Request $request, int $receiverId): JsonResponse
    {
        $result = $this->conversationService->findOrCreateConversation($receiverId);

        return $this->sendSuccessResponse(
            'Conversation retrieved successful',
            new ConversationResource($result),
            Response::HTTP_OK
        );
    }
}
