<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\Response;

abstract class Controller
{
    protected function sendSuccessResponse(
        string $message,
        mixed $data = null,
        int $status = Response::HTTP_OK
    ) {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], $status);
    }

    protected function sendErrorResponse(
        string $message,
        array $errors = [],
        int $status = Response::HTTP_INTERNAL_SERVER_ERROR
    ) {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors
        ], $status);
    }
}
