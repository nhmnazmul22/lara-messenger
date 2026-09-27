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
}
