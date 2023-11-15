import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: '/sign'
  }
})
export const config = {
  matcher: [
    "/users/:path*",
    "/conversation/:path*"
  ]
}
