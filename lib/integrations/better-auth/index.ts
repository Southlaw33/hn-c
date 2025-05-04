import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

export const betterAuthClient = createAuthClient({
  baseURL:
    "https://hackernews.yellowflower-336119c8.centralindia.azurecontainerapps.io",
  plugins: [nextCookies(), usernameClient()],
});
