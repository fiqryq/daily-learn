<?php

namespace App\Http\Controllers\API;

use Exception;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Helpers\ResponseFormatter;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function all(Request $request)
    {
        $id = $request->input('id');
        $limit = $request->input('limit', 6);
        $food_id = $request->input('food_id');
        $status = $request->input('status');

        if ($id) {
            $transaction = Transaction::with(['food', 'user'])->find($id);

            if ($transaction) {
                return ResponseFormatter::success($transaction, 'Success get data');
            } else {
                return ResponseFormatter::error(null, 'data not found', 404);
            }
        }

        $transaction =Transaction::with(['food', 'user'])->when('user_id', Auth::user()->id);

        if ($food_id) {
            $transaction->where('food_id', $food_id);
        }

        if ($status) {
            $transaction->where('statu', $status);
        }

        return ResponseFormatter::success($transaction->paginate($limit), 'Success get data list');
    }

    public function checkout(Request $request){
        $request->validate([
            'food_id' => 'required|exists:food,id',
            'user_id' => 'required|exists:users,id',
            'quantity' => 'required',
            'total' => 'required',
            'status' => 'required'
        ]);

        $transaction = Transaction::create([
            'food_id' => $request->food_id,
            'user_id' => $request->user_id,
            'quantity' => $request->quantity,
            'total' => $request->total,
            'status' => $request->status,
            'payment_url' => ''
        ]);

        // config midtrans
        Config::$serverKey = config('services.midtrans.serverKey');
        Config::$clientKey = config('services.midtrans.clientKey');
        Config::$isProduction = config('services.midtrans.isProduction');
        Config::$isSanitized = config('services.midtrans.isSanitized');
        Config::$is3Ds = config('services.midtrans.is3ds');

        $transaction = Transaction::with(['food','user'])->find($transaction->id);

        // midtrans

        $midtrans = [
            'transaction_details' => [
                'order_id' => $transaction->id,
                'gross_amount' => (int) $transaction->total
            ],
            'customer_details' => [
                'first_name' => $transaction->user->name,
                'email' => $transaction->user->email
            ],
            'enabled_payments' => ['gopay','bank_transfer'],
            'vtweb' => []
        ];

        try {
            $paymentUrl = Snap::createTransaction($midtrans)->redirect_url;

            $transaction->payment_url = $paymentUrl;
            $transaction->save();
    
            return ResponseFormatter::sucess($transaction,'Transaction Success');
    
        } catch (Exception $e) {
           return ResponseFormatter::error($e->getMessage(),'Transaction Failed')
        }

    }
}