<?php

use App\Http\Controllers\Auth\GoogleController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

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
    Route::get('dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');
});
