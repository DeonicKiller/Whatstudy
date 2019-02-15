<?php

namespace App\Http\Controllers;

use App\Room;
use App\Message;
use App\Token;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function showAllRooms($token)
    {

        if (!Token::check($token)) {
            return response()->json('Unauthorized token', 401);
        }
        
        {      
            $rooms = Room::all();
            foreach ($rooms as $room) {
                $room->messages;
            }      
            return response()->json($rooms);
        }
    
    }
    
    public function showOneRoom(Room $room, $token)
    {  

        if (!Token::check($token)) {
            return response()->json('Unauthorized token', 401);
        }

        return response()->json($room);
    }

    public function showRoomMessages($room, $token, Request $request)
    {      
        
        $messages = Message::where('room_id', $room )->orderBy('created_at', 'desc')->paginate(20);
        return response()->json($messages);

}

}