<?php

namespace App\Services;

use App\Models\User;
use App\Repository\UserRepository;
use Exception;
use Illuminate\Http\File;
use Illuminate\Http\UploadedFile;

class AuthServices
{

   public function __construct(protected UserRepository $userRepository) {}


   public function registerUser(array $attributes, ?UploadedFile $avatar = null): User
   {
      if ($avatar) {
         $avatarPath = $avatar->store('avatars', 'public');
      }

      return $this->userRepository->createUser([
         ...$attributes,
         'avatar' =>  isset($avatarPath) ? '/storage' . $avatarPath : null
      ]);
   }

   public function loginUser(array $credentials)
   {
      if (! $token = auth('api')->attempt($credentials)) {
         throw new Exception('Invalid credentials');
      }

      return $token;
   }
}
