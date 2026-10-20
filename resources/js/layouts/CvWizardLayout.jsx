import { useState } from 'react';
import { router } from '@inertiajs/react';
import ConfirmModal from '@/components/ConfirmModal';

const STEP_LABELS = [
    'Personal info',
    'Work experience',
    'Education',
    'Skills & Languages',
    'Summary',
];

export default function CvWizardLayout({ step, totalSteps, cv, children }) {
    const [showConfirm, setShowConfirm] = useState(false);

    function goToDashboard() {
        setShowConfirm(true);
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)', fontFamily: 'var(--font-b)' }}>
            <ConfirmModal
                open={showConfirm}
                title="Leave this step?"
                message="Unsaved changes on this page will be lost. Your previous steps are already saved."
                confirmLabel="Leave"
                cancelLabel="Stay"
                onConfirm={() => router.visit('/dashboard')}
                onCancel={() => setShowConfirm(false)}
            />

            {/* Header */}
            <header style={{ borderBottom: '1px solid var(--rule)', padding: '0 2rem' }}>
                <div style={{ maxWidth: 720, margin: '0 auto', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <button
                        onClick={goToDashboard}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: 'var(--fg-mid)', fontSize: '0.85rem', display: 'flex',
                            alignItems: 'center', gap: 6, padding: 0,
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"/>
                        </svg>
                        Dashboard
                    </button>

                    <span style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--accent)' }}>
                        ProCV
                    </span>

                    <span style={{ color: 'var(--fg-muted)', fontSize: '0.85rem' }}>
                        Step {step} of {totalSteps}
                    </span>
                </div>
            </header>

            {/* Progress steps — segmented bar */}
            <div style={{ borderBottom: '1px solid var(--rule)', padding: '0 2rem' }}>
                <div style={{ maxWidth: 720, margin: '0 auto', padding: '12px 0' }}>
                    <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
                        {STEP_LABELS.map((_, i) => {
                            const n = i + 1;
                            const done = n < step;
                            const active = n === step;
                            return (
                                <div key={n} style={{
                                    flex: 1, height: 4, borderRadius: 99,
                                    background: done ? 'var(--accent)' : active ? 'color-mix(in srgb, var(--accent) 45%, transparent)' : 'var(--rule)',
                                    transition: 'background 0.3s',
                                }} />
                            );
                        })}
                    </div>
                    <div style={{ display: 'flex' }}>
                        {STEP_LABELS.map((label, i) => {
                            const n = i + 1;
                            const done = n < step;
                            const active = n === step;
                            return (
                                <div key={n} style={{
                                    flex: 1, fontSize: '0.68rem', textAlign: 'center',
                                    color: active ? 'var(--fg)' : done ? 'var(--accent)' : 'var(--fg-muted)',
                                    fontWeight: active ? 600 : 400,
                                }}>
                                    {label}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Content */}
            <main style={{ maxWidth: 720, margin: '0 auto', padding: '2.5rem 2rem' }}>
                {children}
            </main>
        </div>
    );
}
