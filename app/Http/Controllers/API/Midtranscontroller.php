<?php

namespace App\Http\Controllers\API;

use Midtrans\Notification;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Midtranscontroller extends Controller
{
    public function callback(Request $request){
    // config midtrans
    Config::$serverKey = config('services.midtrans.serverKey');
    Config::$clientKey = config('services.midtrans.clientKey');
    Config::$isProduction = config('services.midtrans.isProduction');
    Config::$isSanitized = config('services.midtrans.isSanitized');
    Config::$is3Ds = config('services.midtrans.is3ds');

    $notification = new Notification();

    $status = $notification->transaction_status;
    $type = $notification->payment_type;
    $fraud = $notification->fraud_status;
    $order_id = $notification->order_id;

    $transaction = Transaction::findOrfail($order_id);

    if ($status == 'capture') {
        if ($type == 'credit_card') {
            if ($fraud == 'challenge') {
                $transaction->status = 'PENDING'
            } else {
                $transaction->status = 'SUCCESS'
            }
        }
    } else if($status == 'settlement') {
        $transaction->status = 'SUCCESS'
    } else if($status == 'pending'){
        $transaction->status = 'PENDING'
    } else if($status == 'deny'){
        $transaction->status = 'CANCELLED'
    } else if($status == 'expire'){
        $transaction->status = 'CANCELLED'
    }  else if($status == 'cancel'){
        $transaction->status = 'CANCELLED'
    }

    $transaction->save();
    
    }
}