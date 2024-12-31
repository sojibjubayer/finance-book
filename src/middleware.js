import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = async (request) => {

  const token = cookies(request).get("__Secure-next-auth.session-token");

  const pathname = request.nextUrl.pathname;

  if (pathname.includes('api')) {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL(`/login`, request.url);

    
    loginUrl.searchParams.set('redirect', pathname);

    return NextResponse.redirect(loginUrl);
  }


  return NextResponse.next();
};


export const config = {
  matcher: ["/", "/add-transaction", "/set-budget", "/expense-insights","/view-transactions"],
};
