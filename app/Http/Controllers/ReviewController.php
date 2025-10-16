<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReviewRequest;
use App\Http\Requests\UpdateReviewRequest;
use App\Http\Requests\BulkUpdateReviewRequest;
use App\Http\Requests\BulkDeleteReviewRequest;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\UploadReviewMediaRequest;


class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->pass("index review");

        $data = Review::query()
            ->with(['media', 'transaction', 'user'])
            ->when($request->name, function($q, $v){
                $q->where('name', $v);
            });

        return Inertia::render('review/index', [
            'reviews' => $data->get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can("create review"),
                'canShow' => $this->user->can("show review"),
                'canUpdate' => $this->user->can("update review"),
                'canDelete' => $this->user->can("delete review"),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReviewRequest $request)
    {
        $this->pass("create review");

        $data = $request->validated();
        Review::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        $this->pass("show review");

        if ($this->user->cannot('show review', Review::class)) {
            return abort(403);
        }

        return Inertia::render('review/show', [
            'review' => $review,
            'permissions' => [
                'canUpdate' => $this->user->can("update review"),
                'canDelete' => $this->user->can("delete review"),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReviewRequest $request, Review $review)
    {
        $this->pass("update review");

        $data = $request->validated();
        $review->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        $this->pass("delete review");

        $review->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateReviewRequest $request)
    {
        $this->pass("update review");

        $data = $request->validated();
        Review::whereIn('id', $data['review_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteReviewRequest $request)
    {
        $this->pass("delete review");

        $data = $request->validated();
        Review::whereIn('id', $data['review_ids'])->delete();
    }



    /**
     * Register media conversions.
     */
    public function uploadMedia(UploadReviewMediaRequest $request, Review $review)
    {
        $this->pass("update review");

        $data = $request->validated();
        $review->addMedia($data['file'])->toMediaCollection();
    }
}
