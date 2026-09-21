<?php

namespace App\Services;

use App\Repository\UserRepository;

class AuthServices
{

   public function __construct(protected UserRepository $userRepository) {}


   public function registerUser(array $attributes)
   {
      return $this->userRepository->createUser($attributes);
   }
}
