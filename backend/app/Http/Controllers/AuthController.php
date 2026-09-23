<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest\LoginRequest;
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
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $token = $this->authServices->loginUser($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'User login successful',
            'data' => [
                'token' => $token
            ]
        ],  Response::HTTP_OK)
            ->cookie(
                'auth_token',
                $token,
                60,
                '/',
                null,
                app()->isProduction(),
                true
            );
    }

    /**
     * Register
     * Route: /api/auth/register
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {

        $result = $this->authServices->registerUser($request->validated(), $request->file('avatar'));

        return $this->sendSuccessResponse(
            'User registration successful',
            new UserResource($result),
            Response::HTTP_CREATED
        );
    }

    /**
     * Logout
     * Route: /api/auth/logout
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        auth()->logout();

        return $this->sendSuccessResponse(
            'User logout successful',
            null,
            Response::HTTP_OK
        )
            ->withCookie(cookie()->forget('auth_token'));
    }
}
