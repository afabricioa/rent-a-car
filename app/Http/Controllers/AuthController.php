<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller{

    public function register(Request $request){
        $data = $request->validate([
            'name' => 'string|required',
            'email' => 'required|email|string|unique:users,email',
            'phone' => 'required|string',
            'driver_liencese' => 'required|string',
            'password' => ['required', 'confirmed', Password::min(8)->numbers()]
        ]);

        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'driver_license' => $data['driver_license'],
            'password' => bcrypt($data['password']),
            'is_admin' => false
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

}
