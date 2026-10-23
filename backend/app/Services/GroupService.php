<?php

namespace App\Services;

use App\Models\Group;
use App\Repository\GroupRepository;
use Illuminate\Support\Collection;


class GroupService
{

    public function __construct(protected GroupRepository $groupRepository)
    {
    }

    public function groupCollection(): Collection
    {
        return $this->groupRepository->getAllGroups();
    }

    public function createNewGroup(array $attributes): Group
    {

        // create a new group
        $group = $this->groupRepository->createGroup([
            'name' => $attributes['name'],
            'description' => $attributes['description'],
            'owner_id' => $attributes['ownerId']
        ]);

        // attach all users
        if (isset($attributes['usersIds'])) {
            $group->users()->syncWithoutDetaching($attributes['usersIds']);
        }

        return $group->load(['owner', 'users']);
    }

}

