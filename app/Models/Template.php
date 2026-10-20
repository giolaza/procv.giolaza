<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['name', 'is_premium', 'is_active'])]
class Template extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'is_premium' => 'boolean',
            'is_active'  => 'boolean',
        ];
    }

    public function cvs(): HasMany
    {
        return $this->hasMany(Cv::class);
    }
}
