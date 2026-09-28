<?php

namespace App\Services;

use App\Repository\ConversationRepository;

class ConversationService
{

   public function __construct(protected ConversationRepository $repository) {}


   public function getAllConversations()
   {
      return $this->repository->findUserConversations(auth()->id());
   }

   public function findOrCreateConversation(int $receiverId)
   {
      $conversation = $this->repository->findConversation($receiverId);

      if (!$conversation) {
         $conversation  = $this->repository->createConversation([
            'user_id1' => auth()->id(),
            'user_id2' => $receiverId
         ]);
      }

      return $conversation;
   }
}
