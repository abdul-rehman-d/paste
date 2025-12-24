import { getIronSession, type IronSession } from "iron-session";
import { cookies } from "next/headers";

export type SessionData = {
  unlockedRoom?: string;
};

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();

  return getIronSession<SessionData>(cookieStore, {
    // password: process.env.SESSION_SECRET!,
    password: "f0ae96233f470496d45b91a427f7f6d0",
    cookieName: "page_unlock",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      maxAge: undefined,
      sameSite: "lax",
      httpOnly: true,
      path: "/",
    },
  });
}
