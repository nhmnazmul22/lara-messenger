<?php

namespace App\Repository;

use App\Models\User;
use Illuminate\Support\Collection;

class UserRepository
{

   public function __construct(protected User $userModel) {}


   public function createUser(array $attributes): User
   {
      return $this->userModel->create($attributes);
   }

   public function findAll(): Collection
   {
      return $this->userModel->all();
   }
}
