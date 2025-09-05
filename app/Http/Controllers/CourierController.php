<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCourierRequest;
use App\Http\Requests\UpdateCourierRequest;
use App\Http\Requests\BulkUpdateCourierRequest;
use App\Http\Requests\BulkDeleteCourierRequest;
use App\Models\Courier;
use Illuminate\Http\Request;
use Inertia\Inertia;


class CourierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->pass("index courier");
        
        $data = Courier::query()
            //->with(['media'])
            ->when($request->name, function($q, $v){
                $q->where('name', $v);
            });

        return Inertia::render('courier/index', [
            'couriers' => $data->get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can("create courier"),
                'canShow' => $this->user->can("show courier"),
                'canUpdate' => $this->user->can("update courier"),
                'canDelete' => $this->user->can("delete courier"),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourierRequest $request)
    {
        $this->pass("create courier");

        $data = $request->validated();
        Courier::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Courier $courier)
    {
        $this->pass("show courier");

        if ($this->user->cannot('show courier', Courier::class)) {
            return abort(403);
        }

        return Inertia::render('courier/show', [
            'courier' => $courier,
            'permissions' => [
                'canUpdate' => $this->user->can("update courier"),
                'canDelete' => $this->user->can("delete courier"),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourierRequest $request, Courier $courier)
    {
        $this->pass("update courier");

        $data = $request->validated();
        $courier->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Courier $courier)
    {
        $this->pass("delete courier");

        $courier->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateCourierRequest $request)
    {
        $this->pass("update courier");

        $data = $request->validated();
        Courier::whereIn('id', $data['courier_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteCourierRequest $request)
    {
        $this->pass("delete courier");

        $data = $request->validated();
        Courier::whereIn('id', $data['courier_ids'])->delete();
    }

    
    
    
}
