import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

// Next.js 16: renamed from `middleware` to `proxy`, cookies must be awaited
export async function proxy(request: NextRequest) {
    // First, let the supabase middleware update the session (refresh tokens) and get the response object
    let response = await updateSession(request);

    // After updating the session, we can check if the user is authenticated 
    // by manually inspecting the cookies or getting the user in the proxy directly. 
    // It's safer to just check `sb-[projectref]-auth-token` existence for preliminary gating,
    // although `updateSession` itself does `getUser()`. 
    // We can just rely on the session cookie existence for basic redirects, 
    // since the server components/API will strictly verify it.

    const cookieStore = request.cookies;
    // Assuming the supabase project ID exists in the Next_PUBLIC_SUPABASE_URL, 
    // we can look for any cookie starting with 'sb-' and ending with '-auth-token'
    const hasSession = Array.from(cookieStore.getAll()).some(c => c.name.startsWith('sb-') && c.name.endsWith('-auth-token'));

    // Protect the client portal route
    if (request.nextUrl.pathname.startsWith('/client-portal')) {
        if (!hasSession) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Prevent logged-in users from seeing the login page
    if (request.nextUrl.pathname.startsWith('/login')) {
        if (hasSession) {
            return NextResponse.redirect(new URL('/client-portal', request.url));
        }
    }

    return response;
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/client-portal/:path*', '/login'],
};
