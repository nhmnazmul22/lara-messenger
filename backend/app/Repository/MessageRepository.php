<?php

namespace App\Repository;

use App\Models\Message;

class MessageRepository
{

    public function __construct(protected Message $model) {}


    public function saveMessage(array $attributes)
    {
        return $this->model->create($attributes);
    }

    public function findConversationMessages(int $conversationId)
    {
        return $this->model
            ->where('conversation_id', $conversationId)
            ->paginate(15);
    }

    public function findGroupMessages(int $groupId)
    {
        return $this->model
            ->where('group_id', $groupId)
            ->paginate(15);
    }
}
