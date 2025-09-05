<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Requests\BulkUpdateProductRequest;
use App\Http\Requests\BulkDeleteProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\UploadProductMediaRequest;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->pass("index product");

        $data = Product::query()
            ->with(['media', 'category'])
            ->when($request->name, function($q, $v){
                $q->where('name', $v);
            });

        return Inertia::render('product/index', [
            'products' => $data->get(),
            'query' => $request->input(),
            'categories' => Category::get(),
            'permissions' => [
                'canAdd' => $this->user->can("create product"),
                'canShow' => $this->user->can("show product"),
                'canUpdate' => $this->user->can("update product"),
                'canDelete' => $this->user->can("delete product"),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $this->pass("create product");

        $data = $request->validated();
        Product::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $this->pass("show product");

        if ($this->user->cannot('show product', Product::class)) {
            return abort(403);
        }

        return Inertia::render('product/show', [
            'product' => $product,
            'permissions' => [
                'canUpdate' => $this->user->can("update product"),
                'canDelete' => $this->user->can("delete product"),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $this->pass("update product");

        $data = $request->validated();
        $product->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $this->pass("delete product");

        $product->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateProductRequest $request)
    {
        $this->pass("update product");

        $data = $request->validated();
        Product::whereIn('id', $data['product_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteProductRequest $request)
    {
        $this->pass("delete product");

        $data = $request->validated();
        Product::whereIn('id', $data['product_ids'])->delete();
    }

    /**
     * View archived resource from storage.
     */
    public function archived()
    {
        $this->pass("archived product");

        return Inertia::render('product/archived', [
            'products' => Product::onlyTrashed()->get(),
        ]);
    }

    /**
     * Restore the specified resource from storage.
     */
    public function restore($id)
    {
        $this->pass("restore product");

        $model = Product::onlyTrashed()->findOrFail($id);
        $model->restore();
    }

    /**
     * Force delete the specified resource from storage.
     */
    public function forceDelete($id)
    {
        $this->pass("force delete product");

        $model = Product::onlyTrashed()->findOrFail($id);
        $model->forceDelete();
    }

    /**
     * Register media conversions.
     */
    public function uploadMedia(UploadProductMediaRequest $request, Product $product)
    {
        $this->pass("update product");

        $data = $request->validated();
        $product->addMedia($data['file'])->toMediaCollection();
    }
}
