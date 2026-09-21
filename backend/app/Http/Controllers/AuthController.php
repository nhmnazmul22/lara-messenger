<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest\RegisterRequest;
use App\Http\Resources\Users\UserResource;
use App\Services\AuthServices;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{

    public function __construct(protected AuthServices $authServices) {}

    /**
     * Login
     * Route: /api/auth/login
     * @return void
     */
    public function login() {}

    /**
     * Register
     * Route: /api/auth/register
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $result = $this->authServices->registerUser($request->validated());

        return $this->sendSuccessResponse(
            'User registration successful',
            new UserResource($result),
            Response::HTTP_CREATED
        );
    }

    /**
     * Logout
     * Route: /api/auth/logout
     * @return void
     */
    public function logout() {}
}
