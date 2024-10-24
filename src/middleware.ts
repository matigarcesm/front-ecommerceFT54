import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// Este middleware puede ser marcado como `async` si usas `await` dentro de él
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Verifica si el usuario NO está logueado (no existe la cookie)
    if ((pathname === "/dashboard" || pathname === "/cart") && !request.cookies.get("userData")?.value) {
        // Si no hay cookie de `userData`, redirigir al login
        const loginURL = new URL("/login", request.nextUrl.origin);
        return NextResponse.redirect(loginURL);
    }

    // Si la cookie existe, permitir el acceso
    return NextResponse.next();
}
