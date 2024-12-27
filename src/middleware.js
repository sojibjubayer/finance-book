import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = async (request) => {
  // Extract the session token from cookies
  const token = cookies(request).get("__Secure-next-auth.session-token");

  // Get the current path of the request
  const pathname = request.nextUrl.pathname;

  // If the path is an API route, allow it to pass through without authentication
  if (pathname.includes('api')) {
    return NextResponse.next();
  }

  // If there's no token, redirect to login page
  if (!token) {
    const loginUrl = new URL(`/login`, request.url);

    // Attach the pathname as a redirect query parameter, to send the user back to the original page after login
    loginUrl.searchParams.set('redirect', pathname);

    return NextResponse.redirect(loginUrl);
  }

  // If a token exists (user is authenticated), allow the request to proceed
  return NextResponse.next();
};

// Define the routes where this middleware should apply
export const config = {
  matcher: ["/", "/add-transaction", "/set-budget", "/expense-insights"],
};
