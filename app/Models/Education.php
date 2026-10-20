<?php

namespace App\Models;

use App\Enums\DegreeType;
use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'user_id', 'cv_id', 'institution', 'degree', 'field_of_study',
    'start_date', 'end_date', 'is_current', 'description',
])]
class Education extends Model
{
    use HasFactory, HasUuidV7;

    protected function casts(): array
    {
        return [
            'degree'     => DegreeType::class,
            'is_current' => 'boolean',
            'start_date' => 'date',
            'end_date'   => 'date',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function cv(): BelongsTo
    {
        return $this->belongsTo(Cv::class);
    }
}
