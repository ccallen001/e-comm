import { NextRequest, NextResponse } from "next/server";

const isAuthenticated = async (req: NextRequest) => {
  const authHeader =
    req.headers.get("Authorization") || req.headers.get("authorization");

  if (!authHeader) return false;

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  return (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  );
};

export async function middleware(req: NextRequest) {
  if ((await isAuthenticated(req)) === false) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }
}

export const config = {
  matcher: "/admin/:path*",
};
