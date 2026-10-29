<?php

namespace App\Http\Controllers;

use App\Http\Requests\Message\SendMessageRequest;
use App\Http\Resources\Message\MessageResource;
use App\Services\MessageService;
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

}
