<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Http\Requests\BulkUpdateTransactionRequest;
use App\Http\Requests\BulkDeleteTransactionRequest;
use App\Models\Cart;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Http\Requests\UploadTransactionMediaRequest;


class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->pass("index transaction");

        $data = Transaction::query()
            ->with(['media', 'user', 'courier'])
            ->whereUserId($this->user->id)
            ->when($request->name, function($q, $v){
                $q->where('name', $v);
            });

        return Inertia::render('transaction/index', [
            'transactions' => $data->get(),
            'query' => $request->input(),
            'statusLists' => Transaction::$statusLists,
            'permissions' => [
                'canAdd' => $this->user->can("create transaction"),
                'canShow' => $this->user->can("show transaction"),
                'canUpdate' => $this->user->can("update transaction"),
                'canDelete' => $this->user->can("delete transaction"),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request)
    {
        $this->pass('create transaction');

        $data = $request->validated();
        $data['user_id'] = $this->user->id;
        $cartItems = Cart::whereIn('id', $data['cart_ids'])->with('product')->get();

        $data['items'] = $cartItems->map(function ($cart) {
            return [
                'name' => $cart->product->name,
                'price' => $cart->product->price,
                'quantity' => $cart->qty,
                'image' => $cart->product->thumbnail ?? '',
                'product_id' => $cart->product->id,
            ];
        });

        $data['total_price'] = $cartItems->sum(function ($cart) {
            return $cart->product->price * $cart->qty;
        });

        $transaction = DB::transaction(function () use ($data) {
            $transaction = Transaction::create($data);
            Cart::whereIn('id', $data['cart_ids'])->delete();

            foreach ($data['items'] as $item) {
                Product::find($item['product_id'])->decrement('stock', $item['quantity']);
            }

            return $transaction;
        });

        return redirect()->route('transaction.show', $transaction->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        $this->pass("show transaction");

        if ($this->user->cannot('show transaction', Transaction::class)) {
            return abort(403);
        }

        return Inertia::render('transaction/show', [
            'transaction' => $transaction->load(['media', 'user', 'courier']),
            'statusLists' => Transaction::$statusLists,
            'permissions' => [
                'canUpdate' => $this->user->can("update transaction"),
                'canDelete' => $this->user->can("delete transaction"),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransactionRequest $request, Transaction $transaction)
    {
        $this->pass("update transaction");

        $data = $request->validated();
        $transaction->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        $this->pass("delete transaction");

        $transaction->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateTransactionRequest $request)
    {
        $this->pass("update transaction");

        $data = $request->validated();
        Transaction::whereIn('id', $data['transaction_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteTransactionRequest $request)
    {
        $this->pass("delete transaction");

        $data = $request->validated();
        Transaction::whereIn('id', $data['transaction_ids'])->delete();
    }

    /**
     * View archived resource from storage.
     */
    public function archived()
    {
        $this->pass("archived transaction");

        return Inertia::render('transaction/archived', [
            'transactions' => Transaction::onlyTrashed()->get(),
        ]);
    }

    /**
     * Restore the specified resource from storage.
     */
    public function restore($id)
    {
        $this->pass("restore transaction");

        $model = Transaction::onlyTrashed()->findOrFail($id);
        $model->restore();
    }

    /**
     * Force delete the specified resource from storage.
     */
    public function forceDelete($id)
    {
        $this->pass("force delete transaction");

        $model = Transaction::onlyTrashed()->findOrFail($id);
        $model->forceDelete();
    }

    /**
     * Register media conversions.
     */
    public function uploadMedia(UploadTransactionMediaRequest $request, Transaction $transaction)
    {
        $this->pass("update transaction");

        $data = $request->validated();
        $transaction->addMedia($data['file'])->toMediaCollection();
    }
}
