<?php

namespace App\Models;

use App\Enums\EmploymentType;
use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'user_id', 'cv_id', 'company', 'position', 'employment_type', 'location',
    'start_date', 'end_date', 'is_current', 'description',
])]
class WorkExperience extends Model
{
    use HasFactory, HasUuidV7;

    protected function casts(): array
    {
        return [
            'employment_type' => EmploymentType::class,
            'is_current'      => 'boolean',
            'start_date'      => 'date',
            'end_date'        => 'date',
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
