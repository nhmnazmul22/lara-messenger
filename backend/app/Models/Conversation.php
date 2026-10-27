<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @method where(string $string, int $conversationId)
 * @method create(array $attributes)
 */
class Conversation extends Model
{
    protected $fillable = [
        'user_id1',
        'user_id2',
        'last_message_id'
    ];

    public function userOne(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id1', 'id');
    }

    public function userTwo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id2', 'id');
    }

    public function lastMessage(): BelongsTo
    {
        return $this->belongsTo(Message::class, 'last_message_id', 'id');
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class, 'id', 'id');
    }
}
