<?php

namespace App\Http\Resources\Message;

use App\Http\Resources\Group\MinifiedGroupResource;
use App\Http\Resources\Users\MinifiedUserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
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
            'sender' => $this->whenLoaded('sender', new MinifiedUserResource($this->resource->sender)),
            'receiver' => $this->whenLoaded('receiver', new MinifiedUserResource($this->resource->receiver)),
            'group' => $this->whenLoaded('group', new MinifiedGroupResource($this->resource->group)),
            'conversation_id' => $this->resource->conversation_id,
            'attachments' => $this->whenLoaded('attachments', $this->resource->attachments),
            'created_at' => $this->resource->created_at,
            'updated_at' => $this->resource->updated_at,
        ];
    }
}
