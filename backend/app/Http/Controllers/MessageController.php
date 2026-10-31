<?php

namespace App\Http\Controllers;

use App\Http\Requests\Message\SendMessageRequest;
use App\Http\Resources\Message\MessageResource;
use App\Http\Resources\Message\PaginatedMessageResource;
use App\Models\Conversation;
use App\Services\MessageService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class MessageController extends Controller
{
    public function __construct(protected MessageService $messageService)
    {

    }

    /**
     * @throws Throwable
     */
    public function sendMessage(SendMessageRequest $request)
    {
        $message = $this->messageService->processMessage($request->validated());

        return $this->sendSuccessResponse(
            'Message send successful',
            new MessageResource($message),
            Response::HTTP_CREATED
        );
    }


    public function conversationMessages(Request $request, Conversation $conversation)
    {
        $messages = $this->messageService->getConversationMessages($conversation);

        return (new PaginatedMessageResource($messages))
            ->additional([
                'success' => true,
                'message' => 'Messages retrieved successfully',
            ]);
    }

}
