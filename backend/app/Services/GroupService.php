<?php

namespace App\Services;

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
}

