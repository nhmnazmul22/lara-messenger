<?php

namespace App\Http\Requests\Group;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AddMemberRequest extends FormRequest
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
            'usersIds' => ['required', 'array', 'min:1'],
            'usersIds.*' => [
                'int',
                'exists:users,id',
                Rule::notIn([auth()->id()]),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'usersIds.array' => 'Group users must be provided as an array.',
            'usersIds.min' => 'Minimum one user id must be add',
            'usersIds.*.int' => 'Each group user ID must be an integer.',
            'usersIds.*.exists' => 'One or more selected users do not exist.',
            'usersIds.*.not_in' => 'You cannot be added yourself as a group member.',
        ];
    }

    public function attributes(): array
    {
        return [
            'usersIds' => 'group users',
            'usersIds.*' => 'user ID',
        ];
    }
}
