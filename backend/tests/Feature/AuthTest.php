<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('user can register with proper request payload', function () {
    $payload = [
        'name' => 'test name',
        'email' => 'test@gmail.com',
        'password' => 'password123'
    ];

    $response = $this->post(route('auth.register'), $payload);


    $response->assertCreated();
    $response->assertJson([
        'success' => true,
        'message' => 'User registration successful',
    ]);
    $this->assertDatabaseHas('users', [
        'name' => 'test name',
        'email' => 'test@gmail.com',
    ]);
});
