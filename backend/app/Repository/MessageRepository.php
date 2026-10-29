<?php

namespace App\Repository;

use App\Models\Message;

class MessageRepository
{

    public function __construct(protected Message $model)
    {
    }


    public function saveMessage(array $attributes): Message
    {
        return $this->model->create($attributes);
    }

    public function findConversationMessages(int $conversationId)
    {
        return $this->model
            ->where('conversation_id', $conversationId)
            ->paginate(15);
    }
}
