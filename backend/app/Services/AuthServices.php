<?php

namespace App\Services;

use App\Models\User;
use App\Repository\UserRepository;
use Exception;

class AuthServices
{

   public function __construct(protected UserRepository $userRepository) {}


   public function registerUser(array $attributes): User
   {
      return $this->userRepository->createUser($attributes);
   }

   public function loginUser(array $credentials)
   {
      if (! $token = auth('api')->attempt($credentials)) {
         throw new Exception('Invalid credentials');
      }

      return $token;
   }
}
