<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->as('auth.')->group(function () {
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login', [AuthController::class, 'login'])->name('login');

    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::get('/me', [AuthController::class, 'me'])->name('me');
    });
});

Route::middleware('auth:api')->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users.index');

    Route::get('/conversations', [ConversationController::class, 'index'])->name('conversation.index');
    Route::get('/conversations/{receiverId}', [ConversationController::class, 'getConversation'])
        ->name('conversation.getConversation');
});
