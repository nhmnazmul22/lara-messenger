<?php

namespace App\Http\Resources\Message;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PaginatedMessageResource extends ResourceCollection
{
    public $collects = MessageResource::class;

    public function toArray(Request $request): array
    {
        return $this->collection->toArray();
    }

    public function paginationInformation(
        Request $request,
        array $paginated,
        array $default
    ): array {
        return [
            'meta' => [
                'current_page' => $this->resource->currentPage(),
                'per_page' => $this->resource->perPage(),
                'total' => $this->resource->total(),
                'last_page' => $this->resource->lastPage(),
                'has_more_pages' => $this->resource->hasMorePages(),
            ],
        ];
    }
}
