<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        $googleUser = Socialite::driver('google')->user();

        $raw = $googleUser->getRaw();

        $user = User::updateOrCreate(
            ['google_id' => $googleUser->getId()],
            [
                'first_name' => $raw['given_name'] ?? $googleUser->getName(),
                'last_name'  => $raw['family_name'] ?? null,
                'email'      => $googleUser->getEmail(),
                'avatar'     => $googleUser->getAvatar(),
            ]
        );

        Auth::login($user, remember: true);

        return redirect()->intended('/dashboard');
    }
}
