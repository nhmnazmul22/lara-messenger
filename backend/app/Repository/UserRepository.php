<?php

namespace App\Repository;

use App\Models\User;

class UserRepository
{

   public function __construct(protected User $userModel) {}


   public function createUser(array $attributes): User
   {
      return $this->userModel->create($attributes);
   }
}
