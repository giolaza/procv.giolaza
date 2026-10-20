import { useState, useEffect, useRef } from 'react';

export default function LocationInput({ value, onChange, placeholder = 'City, Country' }) {
    const [query, setQuery] = useState(value ?? '');
    const [suggestions, setSuggestions] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const debounceRef = useRef(null);
    const wrapRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    function handleChange(e) {
        const val = e.target.value;
        setQuery(val);
        onChange(val);

        clearTimeout(debounceRef.current);
        if (val.length < 2) { setSuggestions([]); setOpen(false); return; }

        debounceRef.current = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(val)}&format=json&limit=6&addressdetails=1`,
                    { headers: { 'Accept-Language': 'en' } }
                );
                const data = await res.json();
                const items = data.map(item => {
                    const a = item.address;
                    const city = a.city || a.town || a.village || a.county || '';
                    const country = a.country || '';
                    return city && country ? `${city}, ${country}` : item.display_name.split(',').slice(0, 2).join(',').trim();
                }).filter((v, i, arr) => arr.indexOf(v) === i);
                setSuggestions(items);
                setOpen(items.length > 0);
            } catch {
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        }, 350);
    }

    function select(item) {
        setQuery(item);
        onChange(item);
        setOpen(false);
        setSuggestions([]);
    }

    return (
        <div ref={wrapRef} style={{ position: 'relative' }}>
            <div style={{ position: 'relative' }}>
                <input
                    value={query}
                    onChange={handleChange}
                    onFocus={() => suggestions.length > 0 && setOpen(true)}
                    placeholder={placeholder}
                    autoComplete="off"
                    style={{
                        width: '100%', boxSizing: 'border-box',
                        background: 'var(--bg2)',
                        border: '1px solid var(--rule)',
                        borderRadius: open ? '6px 6px 0 0' : 6,
                        padding: '0.6rem 2rem 0.6rem 0.75rem',
                        color: 'var(--fg)', fontSize: '0.95rem', outline: 'none',
                    }}
                />
                {loading && (
                    <span style={{
                        position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                        width: 14, height: 14, border: '2px solid var(--rule)',
                        borderTopColor: 'var(--accent)', borderRadius: '50%',
                        display: 'inline-block', animation: 'spin 0.6s linear infinite',
                    }} />
                )}
            </div>

            {open && suggestions.length > 0 && (
                <ul style={{
                    position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
                    margin: 0, padding: 0, listStyle: 'none',
                    background: 'var(--bg2)',
                    border: '1px solid var(--rule)', borderTop: 'none',
                    borderRadius: '0 0 6px 6px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    maxHeight: 220, overflowY: 'auto',
                }}>
                    {suggestions.map((item, i) => (
                        <li
                            key={i}
                            onMouseDown={() => select(item)}
                            style={{
                                padding: '0.55rem 0.75rem',
                                fontSize: '0.875rem',
                                color: 'var(--fg-mid)',
                                cursor: 'pointer',
                                borderTop: i > 0 ? '1px solid var(--rule)' : 'none',
                                display: 'flex', alignItems: 'center', gap: 8,
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg3)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, color: 'var(--fg-muted)' }}>
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                            </svg>
                            {item}
                        </li>
                    ))}
                </ul>
            )}

            <style>{`@keyframes spin { to { transform: translateY(-50%) rotate(360deg); } }`}</style>
        </div>
    );
}
