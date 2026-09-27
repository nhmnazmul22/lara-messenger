<?php

namespace App\Http\Controllers;

use App\Http\Resources\Users\UserResource;
use App\Services\UserServices;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{

    public function __construct(protected UserServices $userService) {}

    /**
     * User collection
     * Route: /api/users
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $result = $this->userService->getAllUsers();

        return $this->sendSuccessResponse(
            'User retrieved successful',
            UserResource::collection($result),
            Response::HTTP_OK
        );
    }

}
