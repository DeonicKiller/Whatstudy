<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// RoomController

$router->get('rooms/check/{token}', ['uses' => 'RoomController@showAllRooms']);
$router->get('rooms/{room}/check/{token}', ['uses' => 'RoomController@showOneRoom']);

// MessageController
$router->get('messages/check/{token}', ['uses' => 'MessageController@showAllMessages']);
$router->get('messages/{id}/check/{token}', ['uses' => 'MessageController@showMessage']);
$router->post('messages/check/{token}' , ['uses' => 'MessageController@createMessage']);

// UserController
$router->get('users/check/{token}' , ['uses' => 'userController@showAllusers']);