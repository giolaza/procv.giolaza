<?php

namespace App\Http\Controllers;

use App\Enums\DegreeType;
use App\Enums\EmploymentType;
use App\Enums\LanguageLevel;
use App\Enums\SkillLevel;
use App\Models\Cv;
use App\Models\Education;
use App\Models\Language;
use App\Models\Skill;
use App\Models\WorkExperience;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CvController extends Controller
{
    use AuthorizesRequests;
    private const STEPS = 5;

    public function create(Request $request)
    {
        $user = $request->user();

        if (! $user->is_premium && $user->cvs()->exists()) {
            return redirect()->route('dashboard')->with('error', 'Free plan allows only 1 CV. Upgrade to Pro to create more.');
        }

        $cv = Cv::create([
            'user_id'    => $user->id,
            'first_name' => $user->first_name,
            'last_name'  => $user->last_name,
            'email'      => $user->email,
        ]);

        return redirect()->route('cv.step', ['cv' => $cv->id, 'step' => 1]);
    }

    public function step(Request $request, Cv $cv, int $step)
    {
        $this->authorize('view', $cv);
        abort_if($step < 1 || $step > self::STEPS, 404);

        return Inertia::render("Cv/Step{$step}", [
            'cv'         => $cv->load([
                'workExperiences' => fn ($q) => $q->orderByDesc('is_current')->orderByDesc('start_date'),
                'educations' => fn ($q) => $q->orderByDesc('is_current')->orderByDesc('start_date'),
                'skills'    => fn ($q) => $q->orderBy('order'),
                'languages' => fn ($q) => $q->orderBy('order'),
                'certificates',
            ]),
            'step'       => $step,
            'totalSteps' => self::STEPS,
        ]);
    }

    public function saveStep(Request $request, Cv $cv, int $step)
    {
        $this->authorize('update', $cv);

        match ($step) {
            1 => $cv->update($request->validate([
                'first_name' => ['required', 'string', 'max:255'],
                'last_name'  => ['required', 'string', 'max:255'],
                'headline'   => ['nullable', 'string', 'max:255'],
                'location'   => ['nullable', 'string', 'max:255'],
                'email'      => ['nullable', 'email:rfc', 'max:255'],
                'phone'      => ['nullable', 'string', 'max:50'],
            ])),
            2 => $this->saveWorkExperiences($request, $cv),
            3 => $this->saveEducations($request, $cv),
            4 => $this->saveSkillsAndLanguages($request, $cv),
            5 => $cv->update($request->validate([
                'title'    => ['nullable', 'string', 'max:255'],
                'summary'  => ['nullable', 'string', 'max:5000'],
                'website'  => ['nullable', 'url', 'max:255'],
                'linkedin' => ['nullable', 'url', 'max:255'],
                'github'   => ['nullable', 'url', 'max:255'],
            ], [
                'website.url'  => 'Please enter a valid URL (e.g. https://example.com).',
                'linkedin.url' => 'Please enter a valid LinkedIn URL.',
                'github.url'   => 'Please enter a valid GitHub URL.',
            ])),
            default => null,
        };

        $next = $step + 1;

        if ($next > self::STEPS) {
            return redirect()->route('dashboard');
        }

        return redirect()->route('cv.step', ['cv' => $cv->id, 'step' => $next]);
    }

    private function saveSkillsAndLanguages(Request $request, Cv $cv): void
    {
        $skills = collect($request->input('skills', []));
        $languages = collect($request->input('languages', []));

        if ($skills->isEmpty()) {
            $cv->skills()->delete();
        } else {
            $request->validate([
                'skills.*.name'  => ['required', 'string', 'max:255'],
                'skills.*.level' => ['nullable', Rule::enum(SkillLevel::class)],
            ], [
                'skills.*.name.required' => 'Skill name is required.',
            ]);

            $submittedIds = $skills->pluck('id')->filter()->values();
            $cv->skills()->whereNotIn('id', $submittedIds)->delete();

            foreach ($skills as $i => $skill) {
                $cv->skills()->updateOrCreate(
                    ['id' => $skill['id'] ?? null],
                    ['user_id' => $cv->user_id, 'cv_id' => $cv->id, 'name' => $skill['name'], 'level' => $skill['level'] ?? null, 'order' => $i],
                );
            }
        }

        if ($languages->isEmpty()) {
            $cv->languages()->delete();
        } else {
            $request->validate([
                'languages.*.name'  => ['required', 'string', 'max:255'],
                'languages.*.level' => ['nullable', Rule::enum(LanguageLevel::class)],
            ], [
                'languages.*.name.required' => 'Language name is required.',
            ]);

            $submittedIds = $languages->pluck('id')->filter()->values();
            $cv->languages()->whereNotIn('id', $submittedIds)->delete();

            foreach ($languages as $i => $lang) {
                $cv->languages()->updateOrCreate(
                    ['id' => $lang['id'] ?? null],
                    ['user_id' => $cv->user_id, 'cv_id' => $cv->id, 'name' => $lang['name'], 'level' => $lang['level'] ?? null, 'order' => $i],
                );
            }
        }
    }

    private function saveEducations(Request $request, Cv $cv): void
    {
        $submitted = collect($request->input('educations', []));

        if ($submitted->isEmpty()) {
            $cv->educations()->delete();
            return;
        }

        $data = $request->validate([
            'educations.*.id'             => ['nullable', 'string'],
            'educations.*.institution'    => ['required', 'string', 'max:255'],
            'educations.*.degree'         => ['nullable', Rule::enum(DegreeType::class)],
            'educations.*.field_of_study' => ['nullable', 'string', 'max:255'],
            'educations.*.start_date'     => ['required', 'date'],
            'educations.*.end_date'       => ['nullable', 'date'],
            'educations.*.is_current'     => ['boolean'],
            'educations.*.description'    => ['nullable', 'string', 'max:5000'],
        ], [
            'educations.*.institution.required' => 'Institution name is required.',
            'educations.*.start_date.required'  => 'Start date is required.',
        ]);

        $submittedIds = $submitted->pluck('id')->filter()->values();
        $cv->educations()->whereNotIn('id', $submittedIds)->delete();

        foreach ($data['educations'] as $edu) {
            $cv->educations()->updateOrCreate(
                ['id' => $edu['id'] ?? null],
                array_merge($edu, ['user_id' => $cv->user_id, 'cv_id' => $cv->id]),
            );
        }
    }

    private function saveWorkExperiences(Request $request, Cv $cv): void
    {
        $submitted = collect($request->input('experiences', []));

        if ($submitted->isEmpty()) {
            $cv->workExperiences()->delete();
            return;
        }

        $data = $request->validate([
            'experiences.*.id'              => ['nullable', 'string'],
            'experiences.*.position'        => ['required', 'string', 'max:255'],
            'experiences.*.company'         => ['required', 'string', 'max:255'],
            'experiences.*.employment_type' => ['nullable', Rule::enum(EmploymentType::class)],
            'experiences.*.location'        => ['nullable', 'string', 'max:255'],
            'experiences.*.start_date'      => ['required', 'date'],
            'experiences.*.end_date'        => ['nullable', 'date'],
            'experiences.*.is_current'      => ['boolean'],
            'experiences.*.description'     => ['nullable', 'string', 'max:5000'],
        ], [
            'experiences.*.position.required'   => 'Job title is required.',
            'experiences.*.company.required'    => 'Company name is required.',
            'experiences.*.start_date.required' => 'Start date is required.',
        ]);

        $submittedIds = $submitted->pluck('id')->filter()->values();
        $cv->workExperiences()->whereNotIn('id', $submittedIds)->delete();

        foreach ($data['experiences'] as $exp) {
            $cv->workExperiences()->updateOrCreate(
                ['id' => $exp['id'] ?? null],
                array_merge($exp, ['user_id' => $cv->user_id, 'cv_id' => $cv->id]),
            );
        }
    }
}
