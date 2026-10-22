<?php

namespace App\Services;

use App\Models\Message;
use App\Repository\MessageRepository;
use App\Repository\UserRepository;


class MessageService
{

   public function __construct(protected MessageRepository $messageRepository) {}


   public function processMessage(array $attributes): Message
   {
       // Create the message first
       $message = $this->messageRepository->saveMessage([
           'sender_id' => $attributes['senderId'],
           'receiver_id' => $attributes['receiverId'],
           'conversation_id' => $attributes['conversationId'] ?? null,
           'group_id' => $attributes['groupId'] ?? null,
           'message' => $attributes['message'],
       ]);
       // Attach the attachments

       // Send the message with attachments
      return $message;
   }
}

