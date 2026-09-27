<?php

namespace App\Http\Controllers;

use App\Http\Resources\Users\ConversationResource;
use App\Services\ConversationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ConversationController extends Controller
{

    public  function __construct(protected ConversationService $conversationService) {}

    /**
     * User collection
     * Route: /api/users
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
}
