<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller{

    public function register(Request $request){
        $data = $request->validate([
            'name' => 'string|required',
            'email' => 'required|email|string|unique:users,email',
            'phone' => 'required|string',
            'driver_license' => 'required|string',
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

    public function login(Request $request){
        $credentials = $request->validate([
            'email' => ['required', 'email', 'string'],
            'password' => ['required']
        ]);

        if(!Auth::attempt($credentials)){
            return response([
                'error' => 'The given credentials are incorrect'
            ], 422);
        }

        $user = Auth::user();

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request){
        /** @var User $user */
        $user = Auth::user();

        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    }

}
