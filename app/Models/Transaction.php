<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Illuminate\Database\Eloquent\SoftDeletes;


class Transaction extends Model implements HasMedia
{
    use HasFactory;
    use SoftDeletes;

    use InteractsWithMedia;


    //protected $table = 'transactions';

    /*
    protected $fillable = [
        'user_id',
        'courier_id',
        'items',
        'description',
        'status',
        'total_price',
        'paid'
    ];
    */

    public static $statusLists = [ 'pending', 'shipping', 'delivered', 'cancelled' ];

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public $casts = [
        'items' => 'array',
        'paid' => 'boolean',
    ];

    public $appends = [
        'code',
    ];

    /**
     * Register media conversions.
     */

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function courier()
    {
        return $this->belongsTo(Courier::class);
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }

    public function getCodeAttribute()
    {
        return $this->created_at->format('YmdHis');
    }

}
