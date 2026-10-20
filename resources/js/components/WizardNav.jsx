import { useState } from 'react';
import { router } from '@inertiajs/react';
import ConfirmModal from '@/components/ConfirmModal';

export default function WizardNav({ cv, step, processing, backTo }) {
    const [showConfirm, setShowConfirm] = useState(false);

    function handleBack() {
        if (step <= 1) {
            setShowConfirm(true);
        } else {
            router.visit(route('cv.step', { cv: cv.id, step: step - 1 }));
        }
    }

    return (
        <>
            <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginTop: '2rem',
                paddingTop: '1.5rem', borderTop: '1px solid var(--rule)',
            }}>
                <button
                    type="button"
                    onClick={handleBack}
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

                <button
                    type="submit"
                    disabled={processing}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '0.65rem 1.5rem', borderRadius: 6,
                        border: 'none', background: 'var(--accent)',
                        color: '#fff', fontSize: '0.875rem', fontWeight: 600,
                        cursor: processing ? 'not-allowed' : 'pointer',
                        opacity: processing ? 0.7 : 1, fontFamily: 'var(--font-b)',
                    }}
                >
                    {processing ? 'Saving…' : 'Save & continue'}
                    {!processing && (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"/>
                        </svg>
                    )}
                </button>
            </div>

            <ConfirmModal
                open={showConfirm}
                title="Leave this step?"
                message="Unsaved changes on this page will be lost."
                confirmLabel="Leave"
                cancelLabel="Stay"
                onConfirm={() => router.visit(route('dashboard'))}
                onCancel={() => setShowConfirm(false)}
            />
        </>
    );
}
