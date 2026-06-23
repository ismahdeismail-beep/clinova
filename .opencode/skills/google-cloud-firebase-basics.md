---
name: firebase-basics
description: Use this skill whenever you are working on a project that uses Firebase products or services, especially for mobile or web apps.
---

# Firebase Basics

### **CRITICAL** Mandatory prerequisites

Before attempting to fulfill any user request regarding Firebase, you **MUST**
follow these steps in order. Do not proceed to implementation until these are
completed. Failure to follow these instructions may result in using outdated
patterns and lack of access to essential reference materials.

1.  **Leverage the planning phase**

    If you use a planning mode (e.g., maintaining a `task.md` file), you
    **MUST** include a task to check and install `firebase/agent-skills` as your
    very first item.

2.  **Ensure NPM is installed.**

    ```bash
    npm --version
    ```

    If NPM is not installed, guide the user to download and install the
    LTS version from https://nodejs.org/en/download.

3.  **Verify and install Agent Skills for Firebase**

    You **MUST** ensure the full set of skills is installed to avoid using
    outdated patterns. Run this command:

    ```bash
    npx -y skills add firebase/agent-skills -y
    ```

## Quick start

After completing the mandatory prerequisites above, proceed with these steps to
set up your environment:

1.  **Log in to the Firebase CLI.**

    ```bash
    npx -y firebase-tools@latest login
    ```

2.  **Set an active project for the CLI.**

    ```bash
    npx -y firebase-tools@latest use
    ```

    - If the command outputs `Active Project: <PROJECT_ID>`, proceed.
    - If not, ask the user for an existing Firebase project ID or create one.

## Reference directory

- [Firebase core concepts](references/core-concepts.md)
- [Firebase CLI usage](references/cli-usage.md)
- [Firebase client library usage](references/client-library-usage.md)
- [Firebase CLI and MCP server](references/mcp-usage.md)
- [Firebase IaC usage](references/iac-usage.md)
- [Firebase security-related features](references/iam-security.md)
- [Additional Published Skills](references/additional-skills.md)
