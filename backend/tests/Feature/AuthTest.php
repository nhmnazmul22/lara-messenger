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

test('user can register and login successfully', function () {
    $payload = [
        'name' => 'Test User',
        'email' => 'test@gmail.com',
        'password' => 'password123',
    ];

    // Register user

    $registerResponse = $this->post(
        route('auth.register'),
        $payload
    );

    $registerResponse->assertCreated();

    // Login with registered credentials
    $loginResponse = $this->post(
        route('auth.login'),
        [
            'email' => $payload['email'],
            'password' => $payload['password'],
        ]
    );

    $loginResponse->assertOk();
    $loginResponse->assertJson([
        'success' => true,
        'message' => 'User login successful',
    ]);

    // Check JWT cookie
    $loginResponse->assertCookie('auth_token');
});
