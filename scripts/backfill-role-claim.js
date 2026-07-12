// scripts/backfill-role-claim.js
//
// One-time backfill: assigns the `role: 'authenticated'` custom claim to
// every EXISTING Firebase Authentication user. Run this once, after the
// blocking Cloud Functions (setAuthenticatedRole.ts) are deployed -- those
// only cover new sign-ups/sign-ins, not accounts that already existed.
//
// Setup:
//   1. Download a service account key from Firebase Console > Project
//      settings > Service accounts > Generate new private key.
//   2. Set the env var before running:
//        export GOOGLE_APPLICATION_CREDENTIALS="/path/to/serviceAccountKey.json"
//   3. Run:  node scripts/backfill-role-claim.js
//
// Existing users must sign out and back in (or force-refresh their ID
// token) after this runs for the new claim to appear in their tokens.

'use strict';
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

initializeApp();

async function setRoleCustomClaim() {
  let nextPageToken = undefined;
  let updated = 0;
  let failed = 0;
  let skipped = 0;

  do {
    const listUsersResult = await getAuth().listUsers(1000, nextPageToken);
    nextPageToken = listUsersResult.pageToken;

    await Promise.all(
      listUsersResult.users.map(async (userRecord) => {
        // Don't clobber existing custom claims if this user already has some --
        // merge in the role claim alongside whatever's already set.
        const existingClaims = userRecord.customClaims || {};

        if (existingClaims.role === 'authenticated') {
          skipped++;
          return;
        }

        try {
          await getAuth().setCustomUserClaims(userRecord.uid, {
            ...existingClaims,
            role: 'authenticated',
          });
          updated++;
        } catch (error) {
          failed++;
          console.error(`Failed to set claim for user ${userRecord.uid}:`, error.message);
        }
      })
    );
  } while (nextPageToken);

  console.log(`Done. Updated: ${updated}, already set: ${skipped}, failed: ${failed}`);
}

setRoleCustomClaim()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Backfill script failed:', err);
    process.exit(1);
  });
