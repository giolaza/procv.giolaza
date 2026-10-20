<?php

use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\CvController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('login');


Route::prefix('auth/google')->group(function () {
    Route::get('redirect', [GoogleController::class, 'redirect'])->name('auth.google.redirect');
    Route::get('callback', [GoogleController::class, 'callback'])->name('auth.google.callback');
});

Route::post('logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('/');
})->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        return Inertia::render('Dashboard', [
            'cvs' => $user->cvs()->latest()->get(['id', 'title', 'first_name', 'last_name', 'updated_at']),
        ]);
    })->name('dashboard');

    Route::get('cv/create', [CvController::class, 'create'])->name('cv.create');
    Route::get('cv/{cv}/step/{step}', [CvController::class, 'step'])->name('cv.step');
    Route::post('cv/{cv}/step/{step}', [CvController::class, 'saveStep'])->name('cv.step.save');
});
