<?php

namespace App\Repository;

use App\Models\Conversation;
use Illuminate\Support\Collection;

class ConversationRepository
{

    public function __construct(protected Conversation $model)
    {
    }


    public function findUserConversations(int $userId): Collection
    {
        return $this->model
            ->where('user_id1', $userId)
            ->orWhere('user_id2', $userId)
            ->get();
    }

    public function findConversation(int $receiverId): ?Conversation
    {
        return $this->model
            ->where('user_id1', auth()->id())
            ->where('user_id2', $receiverId)
            ->first();
    }

    public function createConversation(array $attributes): Conversation
    {
        return $this->model->create($attributes);
    }

    public function hasParticipants(
        int $conversationId,
        int $senderId,
        int $receiverId
    ): bool
    {
        return $this->model
            ->where('id', $conversationId)
            ->where(function ($query) use ($senderId, $receiverId) {
                $query->where(function ($query) use ($senderId, $receiverId) {
                    $query->where('user_id1', $senderId)
                        ->where('user_id2', $receiverId);
                })->orWhere(function ($query) use ($senderId, $receiverId) {
                    $query->where('user_id1', $receiverId)
                        ->where('user_id2', $senderId);
                });
            })
            ->exists();
    }


    public function update(int $conversationId, array $attributes): bool
    {
        return $this->model
            ->where('id', $conversationId)
            ->update($attributes);
    }
}
