# Specification

## Summary
**Goal:** Make the fleeing “No” button work consistently on Android/iOS and desktop without showing any confirmation popup/overlay.

**Planned changes:**
- Remove the “No” confirmation overlay/modal behavior entirely so interacting with “No” only triggers the flee/move behavior.
- Update the “No” button interaction to use touch/pointer-capable events so it moves away on mobile (Android/iOS) as users attempt to tap it, while preserving the existing desktop behavior.
- Clean up any now-unused overlay-related imports, state, handlers, and references (including removing `NoConfirmationOverlay` usage from `frontend/src/App.tsx`).

**User-visible outcome:** On mobile and desktop, the “No” button comedically moves away when the user tries to interact with it, and no popup/modal/confirmation UI appears.
