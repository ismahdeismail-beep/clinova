---
name: firebase-apk-scanner
description: Scans Android APKs for Firebase security misconfigurations including open databases, storage buckets, authentication issues, and exposed cloud functions. Use when analyzing APK files for Firebase vulnerabilities, performing mobile app security audits, or testing Firebase endpoint security. For authorized security research only.
argument-hint: [apk-file-or-directory]
allowed-tools: Bash({baseDir}/scanner.sh:*) Bash(apktool:*) Bash(curl:*) Read Grep Glob
disable-model-invocation: true
---

# Firebase APK Security Scanner

You are a Firebase security analyst. When this skill is invoked, scan the provided APK(s) for Firebase misconfigurations and report findings.

## When to Use

- Auditing Android applications for Firebase security misconfigurations
- Testing Firebase endpoints extracted from APKs (Realtime Database, Firestore, Storage)
- Checking authentication security (open signup, anonymous auth, email enumeration)
- Enumerating Cloud Functions and testing for unauthenticated access
- Mobile app security assessments involving Firebase backends
- Authorized penetration testing of Firebase-backed applications

## When NOT to Use

- Scanning apps you do not have explicit authorization to test
- Testing production Firebase projects without written permission
- When you only need to extract Firebase config without testing (use manual grep/strings instead)
- For non-Android targets (iOS, web apps) - this skill is APK-specific
- When the target app does not use Firebase

## Rationalizations to Reject

When auditing, reject these common rationalizations that lead to missed or downplayed findings:

- **"The database is read-only so it's fine"** - Data exposure is still a critical finding
- **"It's just anonymous auth, not real accounts"** - Anonymous tokens bypass `auth != null` rules
- **"The API key is public anyway"** - A public API key does not justify open database rules
- **"There's no sensitive data in there"** - You cannot know what data will be stored in the future
- **"It's an internal app"** - APKs can be extracted from any device
- **"We'll fix it before launch"** - Document the finding; pre-launch vulnerabilities frequently ship to production

## Reference Documentation

For detailed vulnerability patterns and exploitation techniques, consult:
- [Vulnerability Patterns Reference](references/vulnerabilities.md)

## How to Use This Skill

The user will provide an APK file or directory: `$ARGUMENTS`

## Workflow

### Step 1: Validate Input

First, verify the target exists:

```bash
ls -la $ARGUMENTS
```

### Step 2: Run the Scanner

Execute the bundled scanner script on the target:

```bash
{baseDir}/scanner.sh $ARGUMENTS
```

The scanner will:
1. Decompile the APK using apktool
2. Extract Firebase configuration from all sources
3. Test authentication endpoints (open signup, anonymous auth, email enumeration)
4. Test Realtime Database (unauthenticated read/write, auth bypass)
5. Test Firestore (document access, collection enumeration)
6. Test Storage buckets (listing, write access)
7. Test Cloud Functions (enumeration, unauthenticated access)
8. Test Remote Config exposure
9. Generate reports in text and JSON format

### Step 3: Present Results

After the scanner completes, read and summarize the results.

## Severity Classification

- **CRITICAL**: Unauthenticated database read/write, storage write, open signup on private apps
- **HIGH**: Anonymous auth enabled, storage bucket listing, collection enumeration
- **MEDIUM**: Email enumeration, accessible cloud functions, remote config exposure
- **LOW**: Information disclosure without sensitive data
