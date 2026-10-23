<?php

namespace App\Http\Resources\Group;

use App\Http\Resources\Message\MessageResource;
use App\Http\Resources\Users\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GroupResource extends JsonResource
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
            'name' => $this->resource->name,
            'description' => $this->resource->description,
            'owner' => $this->whenLoaded('owner', new UserResource($this->resource->owner)),
            'users' => $this->whenLoaded('users', UserResource::collection($this->resource->users)),
            'messages' => $this->whenLoaded('messages', MessageResource::collection($this->resource->messages)),
            'last_message_id' => $this->resource->last_message_id,
            'created_at' => $this->resource->created_at,
            'updated_at' => $this->resource->updated_at,
        ];
    }
}
