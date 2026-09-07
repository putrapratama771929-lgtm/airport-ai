# Airport AI Clean-Code Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce duplicated UI/state code while preserving existing behavior and adding robust keyboard accessibility to admin dialogs and cards.

**Architecture:** Extract pure utilities and focused client hooks first, then make shared admin and public-feature primitives consume them. Keep each domain page responsible only for its domain data, layout, and rendering. Use native buttons for card activation and a common modal hook for focus behavior.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, Vitest 4.

**Spec:** `docs/superpowers/specs/2026-09-07-clean-code-refactor-design.md`

## Global Constraints

- Retain the current Next.js 16, React 19, TypeScript, Tailwind CSS, and Vitest stack.
- Do not add dependencies.
- Preserve the existing Indonesian copy and demo data.
- Keep public routes and admin routes stable.
- Use accessible native controls where an item activates an action.

---

### Task 1: Extract and test shared UI state utilities

**Files:**
- Create: `lib/dialog-focus.ts`
- Create: `lib/dialog-focus.test.ts`
- Create: `lib/filter-state.ts`
- Create: `lib/filter-state.test.ts`
- Modify: `components/admin/admin-conversations-view.tsx`
- Modify: `components/admin/admin-knowledge-view.tsx`

**Interfaces:**
- Produces: `getFocusableElements(container: HTMLElement): HTMLElement[]` and `getResetFilters(): { query: string; category: "Semua"; status: "Semua" }`.

- [ ] **Step 1: Write failing tests** for empty/default filter values and for returning only enabled, visible focusable descendants.
- [ ] **Step 2: Run `pnpm test lib/filter-state.test.ts lib/dialog-focus.test.ts`** and confirm the imports fail because the modules do not exist.
- [ ] **Step 3: Implement the minimal pure utilities** in `lib/filter-state.ts` and `lib/dialog-focus.ts`.
- [ ] **Step 4: Run the same tests** and confirm they pass.
- [ ] **Step 5: Replace duplicated reset constants and focusable-selector logic** in both admin views.

### Task 2: Create an accessible admin detail dialog

**Files:**
- Create: `components/admin/admin-detail-dialog.tsx`
- Modify: `components/admin/admin-conversations-view.tsx`
- Modify: `components/admin/admin-knowledge-view.tsx`

**Interfaces:**
- Consumes: `getFocusableElements(container)`.
- Produces: `AdminDetailDialog({ titleId, onClose, children })` that focuses its close control, traps Tab/Shift+Tab, responds to Escape, and restores the triggering focus.

- [ ] **Step 1: Write a failing unit test** for the dialog focus utility edge case (one focusable element).
- [ ] **Step 2: Run the relevant Vitest file** and confirm the assertion fails before implementation.
- [ ] **Step 3: Implement the dialog component using the tested utility** and use native semantic controls.
- [ ] **Step 4: Replace each inlined modal shell** with the shared component, keeping domain-specific detail markup in its source view.
- [ ] **Step 5: Run `pnpm test`** and confirm the suite passes.

### Task 3: Make admin list activation semantic and remove repeated filtering UI

**Files:**
- Create: `components/admin/admin-filter-bar.tsx`
- Modify: `components/admin/admin-conversations-view.tsx`
- Modify: `components/admin/admin-knowledge-view.tsx`

**Interfaces:**
- Produces: `AdminFilterBar({ query, onQueryChange, category, categories, onCategoryChange, status, statuses, onStatusChange, onReset, placeholder })`.

- [ ] **Step 1: Write a failing test** for a pure `hasActiveFilters` helper used by the filter bar.
- [ ] **Step 2: Run that test** and confirm it fails because the helper is missing.
- [ ] **Step 3: Add the minimal helper and filter-bar component** with accessible input/select labels.
- [ ] **Step 4: Convert conversation cards to `<button type="button">`** while preserving their visual classes and render knowledge cards with the same keyboard semantics.
- [ ] **Step 5: Run `pnpm test` and `pnpm lint`** and confirm both pass.

### Task 4: Extract public feature primitives and simplify shell state

**Files:**
- Create: `components/ui/search-footer.tsx`
- Create: `components/ui/filter-chip.tsx`
- Create: `hooks/use-header-scroll.ts`
- Create: `hooks/use-outside-dismiss.ts`
- Modify: `components/layout/app-shell.tsx`
- Modify: `components/facilities/facility-map.tsx`
- Modify: `components/transport/transport-guide.tsx`
- Modify: `components/baggage/baggage-services.tsx`

**Interfaces:**
- Produces: `SearchFooter({ label, value, onChange, onSubmit, placeholder })`, `FilterChip({ active, onClick, children })`, `useHeaderScroll(threshold)`, and `useOutsideDismiss(ref, onDismiss)`.

- [ ] **Step 1: Write failing tests for pure class/state helpers** introduced by the hooks or primitives.
- [ ] **Step 2: Run the targeted tests** and confirm failure before source implementation.
- [ ] **Step 3: Implement the smallest shared primitives** without changing visual class contracts.
- [ ] **Step 4: Replace duplicated chip/search-footer markup and shell listeners** with those units.
- [ ] **Step 5: Run `pnpm test`, `pnpm lint`, and `pnpm build`**; document any font-network build failure separately.

### Task 5: Remove dead abstractions and update project guidance

**Files:**
- Modify: `components/chat/chat-interface.tsx`
- Modify: `components/flights/flight-dashboard.tsx`
- Modify: `lib/navigation-state.ts`
- Modify: `README.md`

**Interfaces:**
- Removes the commented legacy `replyFor` implementation and the pass-through `syncSearchQuery` function.

- [ ] **Step 1: Write a failing test only if removing a helper requires a replacement behavior.**
- [ ] **Step 2: Replace `syncSearchQuery("", initialSearchQuery)` with direct initial state** and remove the unused export and test.
- [ ] **Step 3: Delete obsolete commented chat logic** while keeping `getDemoReply` as the single reply authority.
- [ ] **Step 4: Replace the generated README with accurate setup, test, and build notes.**
- [ ] **Step 5: Run all verification commands and inspect the final diff.**
