<?php

namespace App\Http\Controllers;

use App\Message;
use App\Token;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function showAllMessages($token)
    {
        if (!Token::check($token)) {
        return response()->json('Unauthorized token', 401);
        
        }
        $messages = Message::all();
       
       return response()->json($messages);
    }
    
    public function showMessage($messageId)
    {
        if (!Token::check($token)) {
            return response()->json('Unauthorized token', 401);
        
        }
            $message = Message::findOrFail($messageId);
            return response()->json($message);
        }
        
    public function createMessage(Request $request)
    {
        if (!Token::check($token)) {
            return response()->json('Unauthorized token', 401);
        }
        $rules = [
            'user_id' => 'max:255',
            'room_id' => 'max:255',
            'description' => 'max:255',
        ];

        $this->validate($request, $rules);

        $message = Message::create($request->all());

        return response()->json($message, 201);
    }
}


