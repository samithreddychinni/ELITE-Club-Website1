'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="px-4 py-2 text-sm text-muted hover:text-foreground transition-colors disabled:opacity-50"
        >
            {loading ? 'Signing out...' : 'Sign Out'}
        </button>
    );
}
