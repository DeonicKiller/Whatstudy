<?php

namespace App\Http\Controllers;

use App\Message;
use App\Token;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

     /**
      * Return the list of Messages
      * @return Illuminate\Http\Response
      */
    public function showAllMessages($token)
    {
        if (!Token::check($token)) {
        return response()->json('Unauthorized token', 401);
        
        }
        
            $messages = Message::all();
            foreach ($messages as $message) {
                $message->user;
                $message->room;
            } 
            return response()->json($messages);
        }
    
    
    /**
     * Show one Message
     * @return Illuminate\Http\Response
     */
    public function showMessage($id, $token)
    {
        if (!Token::check($token)) {
            return response()->json('Unauthorized token', 401);
        
        }
            $message = Message::findOrFail($id);
            return response()->json($message);
        }
     /**
     * Create a message
     * @return Illuminate\Http\Response
     */   
    public function createMessage(Request $request, $token)
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

    public function showOneMessage(Message $message, $token)
    {      
        $message->user;
        $message->room;
        return response()->json($message);
    } 

}


