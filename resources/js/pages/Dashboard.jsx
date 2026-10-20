import { Head, Link, usePage, router } from '@inertiajs/react';
import AppLayout from '../layouts/AppLayout';

const IconPlus = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
);

const IconCv = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
);

const IconDownload = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
);

const IconEdit = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
);

function StatCard({ label, value, sub }) {
    return (
        <div style={{
            background: 'var(--bg2)', border: '1px solid var(--rule)', borderRadius: 6,
            padding: '1.4rem 1.6rem',
        }}>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', fontWeight: 700, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--fg-muted)', marginTop: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
            {sub && <div style={{ fontSize: '0.75rem', color: 'var(--accent)', marginTop: '0.2rem' }}>{sub}</div>}
        </div>
    );
}

function CvCard({ id, title, first_name, last_name, updated_at }) {
    const displayTitle = title || `${first_name ?? ''} ${last_name ?? ''}`.trim() || 'Untitled CV';
    const updatedAt = updated_at
        ? new Date(updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        : '—';

    return (
        <div style={{
            background: 'var(--bg2)', border: '1px solid var(--rule)', borderRadius: 6,
            padding: '1.4rem 1.6rem', display: 'flex', alignItems: 'center', gap: '1.2rem',
        }}>
            <div style={{ color: 'var(--accent)', flexShrink: 0 }}><IconCv /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-d)', fontWeight: 600, fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayTitle}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', marginTop: '0.2rem' }}>Updated {updatedAt}</div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <Link href={route('cv.step', { cv: id, step: 1 })} style={btnStyle}><IconEdit /> Edit</Link>
            </div>
        </div>
    );
}

const btnStyle = {
    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
    background: 'transparent', border: '1px solid var(--rule)',
    borderRadius: 4, padding: '0.35rem 0.75rem',
    fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer',
    color: 'var(--fg-mid)', transition: 'border-color 0.12s, color 0.12s',
    lineHeight: 1,
};

export default function Dashboard() {
    const { auth, flash, cvs } = usePage().props;
    const user = auth?.user;
    const firstName = user?.first_name ?? 'there';

    return (
        <>
            <Head title="Dashboard" />
            <AppLayout>
                {flash?.error && (
                    <div style={{
                        margin: '0 0 1.25rem',
                        padding: '0.75rem 1rem',
                        background: 'rgba(224,85,85,0.1)',
                        border: '1px solid rgba(224,85,85,0.3)',
                        borderRadius: 8,
                        color: '#e05555',
                        fontSize: '0.875rem',
                        display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                        <span>⚠</span> {flash.error}
                    </div>
                )}
                <style>{`
                    .dash-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem; }
                    .dash-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
                    .btn-new {
                        display: inline-flex; align-items: center; gap: 0.5rem;
                        background: var(--accent); color: #fff; border: none;
                        border-radius: 4px; padding: 0.6rem 1.2rem;
                        font-size: 0.875rem; font-weight: 500; cursor: pointer;
                        text-decoration: none; transition: opacity 0.15s; line-height: 1;
                    }
                    .btn-new:hover { opacity: 0.88; }
                    .empty-state {
                        border: 1.5px dashed var(--rule); border-radius: 6px;
                        padding: 4rem 2rem; text-align: center;
                    }
                    .empty-icon { color: var(--fg-muted); margin: 0 auto 1rem; width: fit-content; }
                    .empty-title { font-family: var(--font-d); font-size: 1.1rem; font-weight: 600; margin-bottom: 0.4rem; }
                    .empty-sub { font-size: 0.875rem; color: var(--fg-muted); margin-bottom: 1.5rem; }
                    .cv-list { display: flex; flex-direction: column; gap: 0.75rem; }
                    @media (max-width: 700px) { .dash-grid { grid-template-columns: 1fr; } }
                `}</style>

                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontFamily: 'var(--font-d)', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.25rem', letterSpacing: '-0.02em' }}>
                        Hello, {firstName} 👋
                    </h1>
                    <p style={{ margin: 0, color: 'var(--fg-muted)', fontSize: '0.875rem' }}>
                        {user?.is_premium ? 'Premium plan' : 'Free plan'} · Here's your CV workspace
                    </p>
                </div>

                <div className="dash-grid">
                    <StatCard label="CVs created" value={cvs?.length ?? 0} />
                    <StatCard label="Plan" value={user?.is_premium ? 'Premium' : 'Free'} sub={user?.is_premium ? `Active till ${user?.premium_active_till?.split('T')[0] ?? '—'}` : 'Upgrade for more'} />
                    <StatCard label="Total views" value="—" sub="Share your CV to get views" />
                </div>

                <div className="dash-header">
                    <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>My CVs</h2>
                    <Link href={route('cv.create')} className="btn-new"><IconPlus /> New CV</Link>
                </div>

                {!cvs?.length ? (
                    <div className="empty-state">
                        <div className="empty-icon"><IconCv /></div>
                        <div className="empty-title">No CVs yet</div>
                        <p className="empty-sub">Create your first CV in under 3 minutes</p>
                        <Link href={route('cv.create')} className="btn-new"><IconPlus /> Create my first CV</Link>
                    </div>
                ) : (
                    <div className="cv-list">
                        {cvs.map(cv => <CvCard key={cv.id} {...cv} />)}
                    </div>
                )}
            </AppLayout>
        </>
    );
}
