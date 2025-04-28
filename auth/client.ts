import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";

export const auth = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [nextCookies()],
});
