<?php

namespace App\Models;

use App\Enums\LanguageLevel;
use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['user_id', 'cv_id', 'name', 'level', 'order'])]
class Language extends Model
{
    use HasFactory, HasUuidV7;

    protected function casts(): array
    {
        return [
            'level' => LanguageLevel::class,
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
