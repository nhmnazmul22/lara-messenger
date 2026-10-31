<?php

namespace App\Http\Resources\Conversation;

use App\Http\Resources\Message\MessageResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConversationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'sender' => $this->resource->userOne,
            'receiver' => $this->resource->userTwo,
            'last_message' => $this->whenLoaded('lastMessage', new MessageResource($this->resource->lastMessage)),
            'created_at' => $this->resource->created_at,
            'updated_at' => $this->resource->updated_at,
        ];
    }
}
