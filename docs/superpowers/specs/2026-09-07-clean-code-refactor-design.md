# Airport AI Clean-Code Refactor Design

## Goal

Improve maintainability and client-side efficiency without changing the product's core visual design or user flows, while making interactive cards and dialogs keyboard-accessible.

## Constraints

- Retain the current Next.js 16, React 19, TypeScript, Tailwind CSS, and Vitest stack.
- Do not add dependencies.
- Preserve the existing Indonesian copy and demo data.
- Keep public routes and admin routes stable.
- Use accessible native controls where an item activates an action.

## Architecture

### Admin list pages

`AdminConversationsView` and `AdminKnowledgeView` retain their domain-specific cards and detail content, but share a small controller hook and an accessible dialog primitive. The controller owns query/category/status state and exposes a single reset function. The dialog primitive owns Escape handling, initial focus, focus trapping, and backdrop dismissal; it returns focus to its trigger on close.

### Shared interactive primitives

A reusable filter-chip class helper and search-footer component remove identical Tailwind strings and submission logic from facilities, transport, and baggage screens. Domain components continue to own their data and filtering predicates.

### Shell boundaries

`AppShell` remains the composition root but delegates scroll tracking and outside-dismissal behavior to hooks. This makes navigation state and global event lifecycles independently testable and reduces component complexity.

### Domain data and utilities

Static collections move out of feature components only when used beyond their rendering logic. Single-purpose utilities receive direct names; redundant pass-through abstractions are removed.

## Error Handling and Accessibility

- Dialogs receive `role="dialog"`, `aria-modal`, descriptive labels, Escape support, focus trap, initial focus, and focus restoration.
- Clickable admin cards become buttons or expose equivalent Enter/Space semantics; the implementation will prefer native buttons.
- Decorative icons remain excluded from the accessibility tree where appropriate; control icons retain labels.

## Verification

- Add Vitest coverage for dialog focus utilities, shared filter state, and extracted pure helpers before their implementations.
- Run the complete Vitest suite and ESLint.
- Run `pnpm build`; if font fetching remains unavailable in this environment, record it separately from code verification.
