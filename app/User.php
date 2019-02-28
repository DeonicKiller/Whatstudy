<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;
    
    protected $keyType = 'string';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'user_type_id' ,
    ];

    public function messages()
    {
        return $this->hasMany('App\Message');
    }  

    public function User_type()
    {
        return $this->belongsTo('App\User_type');
    }  
}
