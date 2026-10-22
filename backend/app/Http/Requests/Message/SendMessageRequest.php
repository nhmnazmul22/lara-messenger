<?php

namespace App\Http\Requests\Message;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class SendMessageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'senderId' => ['required','int', 'exists:users,id'],
            'receiverId' => ['required','int', 'exists:users,id'],
            'conversationId' => ['required_without:groupId','int', 'exists:conversations,id'],
            'groupId' => ['required_without:conversationId','int', 'exists:groups,id'],
            'message' => ['required', 'string',],
            'attachments' => ['nullable', 'array'],
            'attachments.*' => [
                'file',
                'max:10240', // 10 MB per file
                'mimes:jpg,jpeg,png,webp,pdf,doc,docx,mp4,mp3',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'senderId.required' => 'The sender is required.',
            'senderId.integer' => 'The sender must be a valid user ID.',
            'senderId.exists' => 'The selected sender does not exist.',

            'receiverId.required' => 'The receiver is required.',
            'receiverId.integer' => 'The receiver must be a valid user ID.',
            'receiverId.exists' => 'The selected receiver does not exist.',

            'message.required' => 'Please enter a message.',
            'message.string' => 'The message must be a valid text string.',

            'attachments.array' => 'Attachments must be provided as a list of files.',
            'attachments.*.file' => 'Each attachment must be a valid uploaded file.',
            'attachments.*.max' => 'Each attachment must not exceed 10 MB.',
            'attachments.*.mimes' => 'Attachments must be JPG, JPEG, PNG, WEBP, PDF, DOC, DOCX, MP4, or MP3 files.',
        ];
    }

    public function attributes(): array
    {
        return [
            'senderId' => 'sender',
            'receiverId' => 'receiver',
            'message' => 'message',
            'attachments' => 'attachments',
            'attachments.*' => 'attachment',
        ];
    }
}
