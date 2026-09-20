import Intercom, { show, shutdown } from "@intercom/messenger-js-sdk";
import type { SafeUser } from "@/lib/auth/current-user";

const INTERCOM_APP_ID = process.env.INTERCOM_APP_ID;

export function bootIntercom(user: SafeUser | null) {
  if (!INTERCOM_APP_ID) return;

  Intercom(
    user
      ? {
          app_id: INTERCOM_APP_ID,
          user_id: user.id,
          name: user.username ?? user.email,
          email: user.email,
          hide_default_launcher: true,
        }
      : { app_id: INTERCOM_APP_ID, hide_default_launcher: true }
  );
}

export const showIntercom = show;
export const shutdownIntercom = shutdown;
