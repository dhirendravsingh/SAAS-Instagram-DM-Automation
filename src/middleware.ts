import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

//since we have to provide the routes that we want to protect, hence below is the code for it
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/api/payment(.*)', '/callback(.*)'])

export default clerkMiddleware(async (auth,req)=>{
    if(isProtectedRoute(req)) await auth.protect()
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};