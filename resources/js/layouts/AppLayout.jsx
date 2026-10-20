import { Link, router, usePage } from '@inertiajs/react';

const LogoSvg = ({ height = 26 }) => (
    <svg height={height} viewBox="0 0 1824 341" xmlns="http://www.w3.org/2000/svg" aria-label="ProCV" style={{ display: 'block' }}>
        <g fill="currentColor">
            <path d="M 30 310 L 30 94 C 30 57 57 30 94 30 L 276 30 L 213 96 L 108 96 C 101 96 97 100 97 107 L 97 155 C 97 162 101 166 108 166 L 319 166 C 327 166 331 162 331 155 L 331 111 L 394 67 C 399 74 401 82 401 91 L 401 176 C 401 213 374 240 337 240 L 108 240 C 101 240 97 244 97 251 L 97 310 Z"/>
            <path d="M 441 310 L 441 154 C 441 116 469 89 507 89 L 668 89 L 607 152 L 519 152 C 512 152 509 156 509 163 L 509 310 Z"/>
            <path fillRule="evenodd" d="M 712 89 L 938 89 C 966 89 986 109 986 137 L 986 262 C 986 290 966 310 938 310 L 712 310 C 684 310 664 290 664 262 L 664 137 C 664 109 684 89 712 89 Z M 752 150 L 898 150 C 909 150 914 155 914 166 L 914 233 C 914 244 909 249 898 249 L 752 249 C 741 249 736 244 736 233 L 736 166 C 736 155 741 150 752 150 Z"/>
            <path d="M 1087 30 L 1255 30 L 1191 96 L 1113 96 C 1098 96 1092 102 1092 117 L 1092 223 C 1092 238 1098 244 1113 244 L 1337 244 L 1401 310 L 1087 310 C 1048 310 1023 285 1023 246 L 1023 94 C 1023 55 1048 30 1087 30 Z"/>
            <path d="M 1388 30 L 1471 30 L 1576 216 L 1638 135 L 1717 135 L 1608 296 C 1598 311 1585 318 1569 318 C 1552 318 1538 310 1529 295 Z"/>
        </g>
        <g fill="#7b00e0">
            <path d="M 303 30 L 347 30 C 364 30 378 37 387 51 L 327 97 L 239 96 Z"/>
            <path d="M 1281 30 L 1356 30 L 1290 96 L 1216 96 Z"/>
            <path d="M 1718 30 L 1793 30 L 1730 116 L 1651 115 Z"/>
        </g>
    </svg>
);

const IconCv = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
);

const IconGrid = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
);

const IconSettings = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
);

const IconLogout = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16 17 21 12 16 7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
);

const navItems = [
    { href: '/dashboard',  label: 'Overview',  icon: <IconGrid /> },
    { href: '/cvs',        label: 'My CVs',    icon: <IconCv /> },
    { href: '/settings',   label: 'Settings',  icon: <IconSettings /> },
];

export default function AppLayout({ children }) {
    const { auth } = usePage().props;
    const url = usePage().url;

    return (
        <>
            <style>{`

                .app-shell { display: flex; min-height: 100vh; }

                /* Sidebar */
                .sidebar {
                    width: var(--sidebar-w); flex-shrink: 0;
                    background: var(--bg2); border-right: 1px solid var(--rule);
                    display: flex; flex-direction: column;
                    position: fixed; inset: 0 auto 0 0;
                    padding: 0 0 1rem;
                    z-index: 10;
                }
                .sidebar-logo {
                    padding: 1.35rem 1.4rem 1.2rem;
                    border-bottom: 1px solid var(--rule);
                    display: block; color: var(--fg); text-decoration: none;
                }
                .sidebar-nav { flex: 1; padding: 1rem 0.6rem; display: flex; flex-direction: column; gap: 2px; }
                .nav-item {
                    display: flex; align-items: center; gap: 0.7rem;
                    padding: 0.6rem 0.85rem; border-radius: 4px;
                    color: var(--fg-mid); text-decoration: none; font-size: 0.875rem; font-weight: 500;
                    transition: background 0.12s, color 0.12s; line-height: 1;
                }
                .nav-item:hover { background: var(--bg3); color: var(--fg); }
                .nav-item.active { background: var(--accent-light); color: var(--accent); }
                .nav-item svg { flex-shrink: 0; }

                .sidebar-user {
                    margin: 0 0.6rem;
                    padding: 0.85rem;
                    border-top: 1px solid var(--rule);
                    display: flex; align-items: center; gap: 0.7rem;
                }
                .user-avatar {
                    width: 32px; height: 32px; border-radius: 50%;
                    background: var(--bg3); overflow: hidden; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    font-family: var(--font-d); font-size: 0.75rem; font-weight: 600; color: var(--fg-muted);
                }
                .user-avatar img { width: 100%; height: 100%; object-fit: cover; }
                .user-info { flex: 1; min-width: 0; }
                .user-name { font-size: 0.8rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .user-plan { font-size: 0.7rem; color: var(--fg-muted); }
                .user-plan.premium { color: var(--accent); }
                .btn-logout {
                    display: flex; align-items: center; justify-content: center;
                    color: var(--fg-muted); background: none; border: none; cursor: pointer;
                    padding: 0.3rem; border-radius: 3px; transition: color 0.12s;
                    flex-shrink: 0;
                }
                .btn-logout:hover { color: var(--fg); }

                /* Main */
                .main-area { margin-left: var(--sidebar-w); flex: 1; display: flex; flex-direction: column; min-height: 100vh; }
                .main-topbar {
                    border-bottom: 1px solid var(--rule); padding: 0 2rem;
                    height: 56px; display: flex; align-items: center; justify-content: space-between;
                    background: var(--bg); position: sticky; top: 0; z-index: 5;
                }
                .topbar-title { font-family: var(--font-d); font-size: 1rem; font-weight: 600; letter-spacing: -0.01em; }
                .main-content { padding: 2rem; flex: 1; }

                @media (max-width: 768px) {
                    .sidebar { transform: translateX(-100%); }
                    .main-area { margin-left: 0; }
                }
            `}</style>

            <div className="app-shell">
                <aside className="sidebar">
                    <Link href="/dashboard" className="sidebar-logo">
                        <LogoSvg height={24} />
                    </Link>

                    <nav className="sidebar-nav">
                        {navItems.map(item => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`nav-item${url.startsWith(item.href) ? ' active' : ''}`}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="sidebar-user">
                        <div className="user-avatar">
                            {auth?.user?.avatar
                                ? <img src={auth.user.avatar} alt={auth.user.full_name} />
                                : (auth?.user?.first_name?.[0] ?? '?')
                            }
                        </div>
                        <div className="user-info">
                            <div className="user-name">{auth?.user?.full_name ?? 'User'}</div>
                            <div className={`user-plan${auth?.user?.is_premium ? ' premium' : ''}`}>
                                {auth?.user?.is_premium ? 'Premium' : 'Free plan'}
                            </div>
                        </div>
                        <button
                            className="btn-logout"
                            title="Sign out"
                            onClick={() => router.post('/logout')}
                        >
                            <IconLogout />
                        </button>
                    </div>
                </aside>

                <div className="main-area">
                    <header className="main-topbar">
                        <span className="topbar-title">
                            {navItems.find(i => url.startsWith(i.href))?.label ?? 'Dashboard'}
                        </span>
                    </header>
                    <main className="main-content">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
