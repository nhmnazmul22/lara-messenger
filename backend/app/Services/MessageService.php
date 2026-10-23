<?php

namespace App\Services;

use App\Models\Message;
use App\Repository\MessageRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Throwable;


class MessageService
{

   public function __construct(protected MessageRepository $messageRepository) {}


    /**
     * @throws Throwable
     */
    public function processMessage(array $attributes): Message
   {
       $storedPaths = [];

     try{
         return DB::transaction(function () use ($attributes, &$storedPaths){
             // Create the message first
             $message = $this->messageRepository->saveMessage([
                 'sender_id' => $attributes['senderId'],
                 'receiver_id' => $attributes['receiverId'],
                 'conversation_id' => $attributes['conversationId'] ?? null,
                 'group_id' => $attributes['groupId'] ?? null,
                 'message' => $attributes['message'],
             ]);
             // Attach the attachments
             if(isset($attributes['attachments'])){
                 foreach ($attributes['attachments'] as $file){
                     if (! $file instanceof UploadedFile) {
                         continue;
                     }
                     $storedPaths[] = $this->processAttachments($file, $message);
                 }
             }

             // Send the message with attachments
             return $message->load('attachments');
         });
     }catch (\Throwable $exception) {
         foreach ($storedPaths as $path) {
             Storage::disk('public')->delete($path);
         }

         throw $exception;
     }
   }


   private function processAttachments(UploadedFile $file, Message $message): string {
      $path = $file->store(
          "messages/{$message->id}",
          'public'
      );

      $message->attachments()->create([
          'name' => $file->getClientOriginalName(),
          'path' => $path,
          'mime' => $file->getMimeType(),
          'size' => $file->getSize(),
      ]);

      return $path;
   }
}

