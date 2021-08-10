<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use App\Helpers\ResponseFormatter;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\Console\Helper\Helper;

class APIUserController extends Controller
{
    public function login(Request $request)
    {
        try {
            $request->validate(['email' => 'email|required', 'password' => 'required']);
            $credentials = request(['email', 'password']);
            if (!Auth::attempt($credentials)) {
                return ResponseFormatter::error([
                    'message' => 'Unautorized',
                    'Autenthication Failed', 500
                ]);
            }

            $user = User::where('email', $request->email)->first();
            if (!Hash::check($request->password, $user->password, [])) {
                throw new \Exception('Invalid Credentials');
            }

            $tokenresult = $user->createToken('authToken')->plainTextToken;
            return ResponseFormatter::success([
                'access_token' => $tokenresult,
                'token_type' => 'Bearer',
                'user' => $user,
                'Authenticated'
            ]);
        } catch (Exception $error) {
            return ResponseFormatter::error([
                'message' => 'Something went wrong!',
                'error' => $error,
                'Autenthication Failed', 500
            ]);
        }
    }
}