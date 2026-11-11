<?php

namespace App\Repository;

use App\Models\Group;
use Illuminate\Support\Collection;

class GroupRepository
{

    public function __construct(protected Group $model) {}

    public function getAllGroups(): Collection
    {
        return $this->model
            ->whereHas('users', function ($query) {
                $query->where('users.id', auth()->id());
            })
            ->get();
    }

    public function createGroup(array $attributes)
    {
        return $this->model->create($attributes);
    }
}
