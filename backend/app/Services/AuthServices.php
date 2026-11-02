<?php

namespace App\Services;

use App\Models\User;
use App\Repository\UserRepository;
use Exception;
use Illuminate\Http\UploadedFile;

class AuthServices
{

    public function __construct(protected UserRepository $userRepository)
    {
    }


    public function registerUser(array $attributes, ?UploadedFile $avatar = null): User
    {
        if ($avatar) {
            $avatarPath = $avatar->store('avatars', 'public');
        }

        return $this->userRepository->createUser([
            ...$attributes,
            'avatar' => $avatarPath ?? null
        ]);
    }

    /**
     * @throws Exception
     */
    public function loginUser(array $credentials): string
    {
        $token = auth('api')->attempt($credentials);

        if (!$token) {
            throw new Exception('Invalid credentials');
        }

        return $token;
    }
}
