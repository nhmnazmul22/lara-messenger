<?php

namespace Tests\Feature\Auth;

use Faker\Core\File;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register_with_avatar(): void
    {

        Storage::fake('public');

        $avatar = UploadedFile::fake()->image('avatar.jpg', 300, 300);

        $payload = [
            'name' => 'test name',
            'email' => 'test@gmail.com',
            'password' => 'password123',
            'avatar' => $avatar,
        ];

        $response = $this->post(
            route('auth.register'),
            $payload
        );

        $response->assertCreated();

        $response->assertJson([
            'success' => true,
            'message' => 'User registration successful',
        ]);

        $this->assertDatabaseHas('users', [
            'name' => 'test name',
            'email' => 'test@gmail.com',
            'avatar' => 'avatars/' . $avatar->hashName(),
        ]);

        Storage::disk('public')->assertExists('avatars/' . $avatar->hashName());
    }

    public function test_user_can_register_with_proper_request_payload(): void
    {
        $payload = [
            'name' => 'test name',
            'email' => 'test@gmail.com',
            'password' => 'password123',
        ];

        $response = $this->post(
            route('auth.register'),
            $payload
        );

        $response->assertCreated();

        $response->assertJson([
            'success' => true,
            'message' => 'User registration successful',
        ]);

        $this->assertDatabaseHas('users', [
            'name' => 'test name',
            'email' => 'test@gmail.com',
        ]);
    }


    public function test_user_can_register_and_login_successfully(): void
    {
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

        $this->assertNotNull(auth()->user());
        // Check JWT cookie
        $loginResponse->assertCookie('auth_token');
    }

    public function test_user_can_logout_successfully()
    {
        $this->test_user_can_register_and_login_successfully();

        // Login with registered credentials
        $logoutResponse = $this->post(route('auth.logout'));

        $logoutResponse->assertOk();

        $logoutResponse->assertJson([
            'success' => true,
            'message' => 'User logout successful',
        ]);

        $this->assertNull(auth()->user());
        // Check JWT cookie
        $logoutResponse->assertCookieExpired('auth_token');
    }
}
