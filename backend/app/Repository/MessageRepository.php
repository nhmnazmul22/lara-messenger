<?php

namespace App\Repository;

use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Collection;

class MessageRepository
{

   public function __construct(protected Message $model) {}


   public function saveMessage(array $attributes): Message
   {
      return $this->model->create($attributes);
   }
}
