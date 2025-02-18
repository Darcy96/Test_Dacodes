import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Middleware personalized to handle redirects
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const authToken = req.cookies.get('next-auth.session-token')
   
    
    // If the user is authenticated and tries to access /login
    if (authToken && req.nextUrl.pathname === "/login") {
      // Redirect to /transfers
      return NextResponse.redirect(new URL("/transfers", req.url));
    }

    // Allow the request for other routes
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: "/login",
    },
  }
);

// Protects all specified routes
export const config = {
  matcher: [
    "/transfers/:path*",
    "/login"
  ]
};
