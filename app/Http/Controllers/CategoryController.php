<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Requests\BulkUpdateCategoryRequest;
use App\Http\Requests\BulkDeleteCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;


class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->pass("index category");
        
        $data = Category::query()
            //->with(['media'])
            ->when($request->name, function($q, $v){
                $q->where('name', $v);
            });

        return Inertia::render('category/index', [
            'categories' => $data->get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can("create category"),
                'canShow' => $this->user->can("show category"),
                'canUpdate' => $this->user->can("update category"),
                'canDelete' => $this->user->can("delete category"),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $this->pass("create category");

        $data = $request->validated();
        Category::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        $this->pass("show category");

        if ($this->user->cannot('show category', Category::class)) {
            return abort(403);
        }

        return Inertia::render('category/show', [
            'category' => $category,
            'permissions' => [
                'canUpdate' => $this->user->can("update category"),
                'canDelete' => $this->user->can("delete category"),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $this->pass("update category");

        $data = $request->validated();
        $category->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $this->pass("delete category");

        $category->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateCategoryRequest $request)
    {
        $this->pass("update category");

        $data = $request->validated();
        Category::whereIn('id', $data['category_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteCategoryRequest $request)
    {
        $this->pass("delete category");

        $data = $request->validated();
        Category::whereIn('id', $data['category_ids'])->delete();
    }

    
    
    
}
