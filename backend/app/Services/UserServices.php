<?php

namespace App\Services;

use App\Repository\UserRepository;


class UserServices
{

   public function __construct(protected UserRepository $userRepository) {}


   public function getAllUsers()
   {
      return $this->userRepository->findAll();
   }
}
