<?php

namespace App\Http\Resources\Conversation;

use App\Http\Resources\Message\MessageResource;
use App\Http\Resources\Users\UserResource;
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
        $isUserOne = $this->resource->user_id1 === auth()->id();

        $me = $isUserOne
            ? $this->resource->userOne
            : $this->resource->userTwo;

        $receiver = $isUserOne
            ? $this->resource->userTwo
            : $this->resource->userOne;


        return [
            'id' => $this->resource->id,
            'me' => new UserResource($me),
            'receiver' => new UserResource($receiver),
            'last_message' => $this->whenLoaded('lastMessage', new MessageResource($this->resource->lastMessage)),
            'created_at' => $this->resource->created_at,
            'updated_at' => $this->resource->updated_at,
        ];
    }
}
