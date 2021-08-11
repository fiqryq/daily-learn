<?php

namespace App\Http\Controllers;

use App\Actions\Fortify\PasswordValidationRules;
use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use App\Helpers\ResponseFormatter;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    use PasswordValidationRules;

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

    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
                'password' => $this->passwordRules()
            ]);

            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'address' => $request->address,
                'houseNumber' => $request->houseNumber,
                'phoneNumber' => $request->phoneNumber,
                'city' => $request->city,
                'password' => Hash::make($request->password)
            ]);

            $user = User::where(['email' => $request->email])->first();
            $tokenresult = $user->createToken('authToken')->plainTextToken;

            return ResponseFormatter::success([
                'access_token' => $tokenresult,
                'token_type' => 'Bearer',
                'user' => $user,
            ]);
        } catch (Exception $eror) {
            return ResponseFormatter::error([
                'message' => 'Something went wrong!',
                'error' => $error,
                'Autenthication Failed', 500
            ]);
        }
    }

    public function updateProfile(Request $request)
    {
        $data = $request->all();
        $user = Auth::user();
        $user->update($data);

        return ResponseFormatter::success($user, 'Profile Updated');
    }

    public function fetch(Request $request)
    {
        return ResponseFormatter::success($request->user(), 'Success get profile data');
    }

    public function updatePhoto(Request $request)
    {
        $validator = Validator::make($request->all(), ['file' => 'required|image|max:2048']);

        if ($validator->fails()) {
            ResponseFormatter::error(
                ['error' => $validator->errors()],
                'Update fails',
                401
            );
        }

        if ($request->file('file')) {
            $file = $request->file->store('assets/user', 'public');
            $user = Auth::user();
            $user->update();

            return ResponseFormatter::success([$file], 'File successfuly updated!');
        }
    }

    public function logout(Request $request)
    {
        $token = $request->user()->currentAccessToken()->delete();
        return ResponseFormatter::success($token, 'Token Revoked');
    }
}