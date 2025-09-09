<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateCartRequest;
use App\Http\Requests\BulkUpdateCartRequest;
use App\Http\Requests\BulkDeleteCartRequest;
use App\Models\Cart;
use Illuminate\Http\Request;
use Inertia\Inertia;


class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->pass("index cart");

        $data = Cart::query()
            ->with(['user', 'product'])
            ->whereUserId($this->user->id)
            ->when($request->name, function($q, $v){
                $q->where('name', $v);
            });

        return Inertia::render('cart/index', [
            'carts' => $data->get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can("create cart"),
                'canShow' => $this->user->can("show cart"),
                'canUpdate' => $this->user->can("update cart"),
                'canDelete' => $this->user->can("delete cart"),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCartRequest $request)
    {
        $this->pass("create cart");

        $data = $request->validated();
        $data['user_id'] = $this->user->id;
        Cart::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Cart $cart)
    {
        $this->pass("show cart");

        if ($this->user->cannot('show cart', Cart::class)) {
            return abort(403);
        }

        return Inertia::render('cart/show', [
            'cart' => $cart,
            'permissions' => [
                'canUpdate' => $this->user->can("update cart"),
                'canDelete' => $this->user->can("delete cart"),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCartRequest $request, Cart $cart)
    {
        $this->pass("update cart");

        $data = $request->validated();
        $cart->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        $this->pass("delete cart");

        $cart->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateCartRequest $request)
    {
        $this->pass("update cart");

        $data = $request->validated();
        Cart::whereIn('id', $data['cart_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteCartRequest $request)
    {
        $this->pass("delete cart");

        $data = $request->validated();
        Cart::whereIn('id', $data['cart_ids'])->delete();
    }




}
