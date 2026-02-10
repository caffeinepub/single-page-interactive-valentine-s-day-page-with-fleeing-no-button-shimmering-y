# Specification

## Summary
**Goal:** Allow the app’s deployment domain name to be changed again, with clear validation against platform rules.

**Planned changes:**
- Add/restore a supported UI and/or settings flow that lets users set or update the deployment domain name multiple times (not one-time-only).
- Validate the domain value to ensure it is 5–50 characters long and contains only letters, numbers, and hyphens.
- Show clear English validation errors that state which rule was violated (length vs. invalid characters).
- Ensure applying a valid domain updates the deployment domain without altering existing Valentine’s Day page behavior.

**User-visible outcome:** Users can change the deployment domain name again; invalid domain entries are rejected with clear English messages, and valid domains are accepted and applied.
