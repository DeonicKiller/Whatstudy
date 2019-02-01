<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
 */

Route::get('/', function () {
    return redirect('index.html');

});
// RoomController
$router->get('rooms/check/{token}', ['uses' => 'RoomController@showAllRooms']);
// MessageController
$router->get('messages/check/{token}', ['uses' => 'MessageController@showAllMessages']);
$router->get('messages/check/{token}', ['uses' => 'MessageController@showMessage']);
$router->get('messages/check/{token}', ['uses' => 'MessageController@createMessage']);