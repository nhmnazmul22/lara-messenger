<?php

namespace App\Repository;

use App\Models\Conversation;
use Illuminate\Support\Collection;

class ConversationRepository
{

   public function __construct(protected Conversation $model) {}


   public function createUser(array $attributes): Conversation
   {
      return $this->model->create($attributes);
   }

   public function findUserConversations(int $userId): Collection
   {
      return $this->model
         ->where('user_id1', $userId)
         ->orWhere('user_id2', $userId)
         ->get();
   }
}
