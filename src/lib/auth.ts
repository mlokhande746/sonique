import { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const scopes = [
  "user-read-email",
  "user-read-private",
  "user-top-read",
  "user-read-recently-played",
].join(",");

const params = {
  scope: scopes,
};

const LOGIN_URL = "https://accounts.spotify.com/authorize?" + new URLSearchParams(params).toString();

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      /**
       * SECURITY HARDENING:
       * We keep the accessToken on the server-side JWT token.
       * We DO NOT expose it to the client via the session object.
       * This prevents the token from being leaked via the useSession() hook.
       */
      return {
        ...session,
        user: {
          ...session.user,
          // Only pass necessary public info
        }
      };
    },
  },
};
