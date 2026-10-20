import { useForm, router } from '@inertiajs/react';
import CvWizardLayout from '@/layouts/CvWizardLayout';
import Field from '@/components/Field';

export default function Step5({ cv, step, totalSteps }) {
    const { data, setData, post, processing, errors } = useForm({
        title:    cv.title    ?? '',
        summary:  cv.summary  ?? '',
        website:  cv.website  ?? '',
        linkedin: cv.linkedin ?? '',
        github:   cv.github   ?? '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('cv.step.save', { cv: cv.id, step }));
    }

    return (
        <CvWizardLayout step={step} totalSteps={totalSteps} cv={cv}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.4rem', fontFamily: 'var(--font-d)' }}>
                Final touches
            </h1>
            <p style={{ color: 'var(--fg-muted)', marginBottom: '2rem' }}>
                Add a personal summary and your online presence.
            </p>

            <form onSubmit={submit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                <Field label="CV title" error={errors.title} hint="Internal name to identify this CV">
                    <input
                        value={data.title}
                        onChange={e => setData('title', e.target.value)}
                        placeholder="e.g. Frontend Developer — 2024"
                    />
                </Field>

                <Field label="Professional summary" error={errors.summary}>
                    <textarea
                        value={data.summary}
                        onChange={e => setData('summary', e.target.value)}
                        placeholder="Write 2–4 sentences about yourself, your experience and what you bring to the table…"
                        rows={5}
                        style={{ resize: 'vertical' }}
                    />
                </Field>

                {/* Links */}
                <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--fg)', marginBottom: '0.75rem' }}>
                        Online presence
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <Field label="Website" error={errors.website}>
                            <input
                                value={data.website}
                                onChange={e => setData('website', e.target.value)}
                                placeholder="https://yoursite.com"
                                type="url"
                            />
                        </Field>
                        <Field label="LinkedIn" error={errors.linkedin}>
                            <input
                                value={data.linkedin}
                                onChange={e => setData('linkedin', e.target.value)}
                                placeholder="https://linkedin.com/in/username"
                                type="url"
                            />
                        </Field>
                        <Field label="GitHub" error={errors.github}>
                            <input
                                value={data.github}
                                onChange={e => setData('github', e.target.value)}
                                placeholder="https://github.com/username"
                                type="url"
                            />
                        </Field>
                    </div>
                </div>

                {/* Nav */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--rule)',
                }}>
                    <BackButton cv={cv} step={step} />
                    <button
                        type="submit"
                        disabled={processing}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '0.7rem 2rem', borderRadius: 6,
                            border: 'none', background: 'var(--accent)',
                            color: '#fff', fontSize: '0.875rem', fontWeight: 700,
                            cursor: processing ? 'not-allowed' : 'pointer',
                            opacity: processing ? 0.7 : 1, fontFamily: 'var(--font-b)',
                        }}
                    >
                        {processing ? 'Saving…' : (
                            <>
                                Finish & go to dashboard
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </CvWizardLayout>
    );
}

function BackButton({ cv, step }) {
    return (
        <button
            type="button"
            onClick={() => router.visit(route('cv.step', { cv: cv.id, step: step - 1 }))}
            style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '0.65rem 1.25rem', borderRadius: 6,
                border: '1px solid var(--rule)', background: 'transparent',
                color: 'var(--fg-mid)', fontSize: '0.875rem', fontWeight: 500,
                cursor: 'pointer', fontFamily: 'var(--font-b)',
            }}
        >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back
        </button>
    );
}
