import { useEffect } from 'react';

export default function ConfirmModal({ open, title, message, confirmLabel = 'Leave', cancelLabel = 'Stay', onConfirm, onCancel }) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === 'Escape' && onCancel();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    if (!open) return null;

    return (
        <div
            onClick={onCancel}
            style={{
                position: 'fixed', inset: 0, zIndex: 1000,
                background: 'rgba(0,0,0,0.45)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '1rem',
                backdropFilter: 'blur(4px)',
                animation: 'fadeIn 0.15s ease',
            }}
        >
            <style>{`
                @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
            `}</style>

            <div
                onClick={e => e.stopPropagation()}
                style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--rule)',
                    borderRadius: 12,
                    padding: '2rem',
                    maxWidth: 400,
                    width: '100%',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
                    animation: 'slideUp 0.18s ease',
                }}
            >
                {/* Icon */}
                <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: 'rgba(224,85,85,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.25rem',
                }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e05555" strokeWidth="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                </div>

                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem', fontWeight: 700, color: 'var(--fg)', fontFamily: 'var(--font-d)' }}>
                    {title}
                </h3>
                <p style={{ margin: '0 0 1.75rem', fontSize: '0.9rem', color: 'var(--fg-mid)', lineHeight: 1.6 }}>
                    {message}
                </p>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                    <button
                        onClick={onCancel}
                        style={{
                            padding: '0.55rem 1.25rem',
                            borderRadius: 6, border: '1px solid var(--rule)',
                            background: 'var(--bg2)', color: 'var(--fg-mid)',
                            fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
                        }}
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{
                            padding: '0.55rem 1.25rem',
                            borderRadius: 6, border: 'none',
                            background: '#e05555', color: '#fff',
                            fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
                        }}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
