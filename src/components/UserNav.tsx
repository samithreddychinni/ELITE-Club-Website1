import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import LogoutButton from './LogoutButton';

export default async function UserNav() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return (
            <Link
                href="/login"
                className="px-4 py-2 bg-primary text-foreground text-sm font-semibold rounded-full hover:scale-105 transition-transform shadow-md"
            >
                Sign In
            </Link>
        );
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, role')
        .eq('id', user.id)
        .single();

    return (
        <div className="flex items-center gap-4">
            {(profile?.role === 'admin' || profile?.role === 'lead') && (
                <Link
                    href="/admin/events"
                    className="px-3 py-1 text-xs bg-foreground text-background font-semibold rounded-full hover:scale-105 transition-transform"
                >
                    Admin
                </Link>
            )}
            <div className="text-sm">
                <span className="text-muted">Hello, </span>
                <span className="text-foreground font-medium">
                    {profile?.full_name?.split(' ')[0] || 'User'}
                </span>
            </div>
            <LogoutButton />
        </div>
    );
}
