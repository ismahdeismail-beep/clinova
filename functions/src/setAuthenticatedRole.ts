// functions/src/setAuthenticatedRole.ts
//
// Blocking Cloud Functions (Gen 2) that assign the `role: 'authenticated'`
// custom claim required by Supabase's Third-Party Auth (Firebase) integration.
//
// Requires Firebase Authentication with Identity Platform enabled
// (blocking functions are not available on plain Firebase Auth).
// If your project doesn't have Identity Platform, use the onCreate +
// admin-SDK backfill approach instead (see scripts/backfill-role-claim.js).
//
// Deploy with: firebase deploy --only functions:beforecreated,functions:beforesignedin

import { beforeUserCreated, beforeUserSignedIn } from 'firebase-functions/v2/identity';

export const beforecreated = beforeUserCreated((event) => {
  return {
    customClaims: {
      // Supabase reads this claim to assign the Postgres `authenticated` role.
      // Without it, requests fall back to `anon` and RLS will silently deny access.
      role: 'authenticated',
    },
  };
});

export const beforesignedin = beforeUserSignedIn((event) => {
  return {
    customClaims: {
      role: 'authenticated',
    },
  };
});
