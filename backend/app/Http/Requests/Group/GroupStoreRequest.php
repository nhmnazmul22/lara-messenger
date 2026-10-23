<?php

namespace App\Http\Requests\Group;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GroupStoreRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'ownerId' => ['required', 'int', 'exists:users,id'],
            'usersIds' => ['nullable', 'array'],
            'usersIds.*' => [
                'int',
                'exists:users,id',
                Rule::notIn([$this->input('ownerId')]),
            ],
        ];
    }

    public function prepareForValidation(): void
    {
        $this->merge([
            'ownerId' => auth()->id(),
        ]);
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The group name is required.',
            'name.string' => 'The group name must be a valid string.',

            'description.string' => 'The group description must be a valid string.',

            'ownerId.required' => 'The group owner is required.',
            'ownerId.int' => 'The group owner ID must be an integer.',
            'ownerId.exists' => 'The selected group owner does not exist.',

            'usersIds.array' => 'Group users must be provided as an array.',
            'usersIds.*.int' => 'Each group user ID must be an integer.',
            'usersIds.*.exists' => 'One or more selected users do not exist.',
            'usersIds.*.not_in' => 'The owner cannot be added as a group member.',
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'group name',
            'description' => 'group description',
            'ownerId' => 'group owner',
            'usersIds' => 'group users',
            'usersIds.*' => 'user ID',
        ];
    }
}
