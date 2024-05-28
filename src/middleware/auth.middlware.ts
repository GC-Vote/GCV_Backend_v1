// import { authMiddleware } from "@clerk/nextjs";
import { authMiddleware } from "@clerk/nextjs/dist/types/server";

export default authMiddleware({
  ignoredRoutes: ["/api/webhooks(.*)"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};