import { Head } from '@inertiajs/react';
import AppLayout from '../layouts/AppLayout';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <AppLayout>
                <p style={{ color: 'var(--fg-muted)', fontSize: '0.9rem' }}>Welcome to ProCV dashboard.</p>
            </AppLayout>
        </>
    );
}
