import { withAuth } from "next-auth/middleware";
export const config = { matcher: ["/post"] };
export default withAuth({})
