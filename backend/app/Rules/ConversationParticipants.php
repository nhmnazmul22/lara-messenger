<?php

namespace App\Rules;

use App\Repository\ConversationRepository;
use App\Services\ConversationService;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

readonly class ConversationParticipants implements ValidationRule
{
    public function __construct(
        private int $senderId,
        private int $receiverId,
    )
    {

    }
    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $conversationService = app(ConversationService::class);

        if (
            ! $conversationService->hasParticipants(
                (int) $value,
                (int) $this->senderId,
                (int) $this->receiverId,
            )
        ) {
            $fail('Both sender and receiver must belong to this conversation.');
        }
    }
}
