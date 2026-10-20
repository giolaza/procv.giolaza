import { cloneElement } from 'react';

export default function Field({ label, error, hint, required, noClone, inputBg, children }) {
    const inputStyle = {
        width: '100%', boxSizing: 'border-box',
        background: inputBg ?? 'var(--bg2)',
        border: `1px solid ${error ? '#e05555' : 'var(--rule)'}`,
        borderRadius: 6, padding: '0.6rem 0.75rem',
        color: 'var(--fg)', fontSize: '0.95rem', outline: 'none',
        fontFamily: 'var(--font-b)',
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--fg)', display: 'flex', gap: 3 }}>
                {label}
                {required && <span style={{ color: '#e05555' }}>*</span>}
            </label>
            {hint && <span style={{ fontSize: '0.78rem', color: 'var(--fg-muted)' }}>{hint}</span>}
            {noClone ? children : cloneElement(children, { style: inputStyle })}
            {error && (
                <span style={{ fontSize: '0.78rem', color: '#e05555', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span>⚠</span> {error}
                </span>
            )}
        </div>
    );
}
