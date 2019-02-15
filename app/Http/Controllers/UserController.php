<?php

namespace App\Http\Controllers;

use App\User;
use App\Token;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function showAllUsers($token)
    {

        if (!Token::check($token)) {
            return response()->json('Unauthorized token', 401);
        }

        return response()->json(User::all());
    }

    public function showOneUser(User $user, $token)
    {      
        if (!Token::check($token)) {
            return response()->json('Unauthorized token', 401);
        }
        
        return response()->json($user);
    } 

}