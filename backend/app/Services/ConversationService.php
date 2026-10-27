<?php

namespace App\Services;

use App\Models\Conversation;
use App\Repository\ConversationRepository;
use Exception;
use Illuminate\Support\Collection;

class ConversationService
{

    public function __construct(protected ConversationRepository $repository)
    {
    }


    public function getAllConversations(): Collection
    {
        return $this->repository->findUserConversations(auth()->id());
    }

    /**
     * @throws Exception
     */
    public function findOrCreateConversation(int $receiverId): ?Conversation
    {
        if ($receiverId === auth()->id()) {
            throw new Exception("Sender can't become receiver");
        }

        $conversation = $this->repository->findConversation($receiverId);

        if (!$conversation) {
            $conversation = $this->repository->createConversation([
                'user_id1' => auth()->id(),
                'user_id2' => $receiverId
            ]);
        }

        return $conversation->load('messages');
    }

    public function hasParticipants(
        int $conversationId,
        int $senderId,
        int $receiverId
    )
    {
        return $this->repository->hasParticipants($conversationId, $senderId, $receiverId);
    }
}
