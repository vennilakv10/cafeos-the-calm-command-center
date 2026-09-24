# CafeOS product prototype

## Goal
Build a high-fidelity interactive CafeOS prototype for Morning Dew Coffee that feels calm, fast, and operationally deep without resembling legacy restaurant software.

## Build
- Create a role-aware shell with branch switching, global status, search, notifications, and prioritized navigation.
- Implement the 15 requested screens as focused app views, with distinct POS, kitchen, table, and owner experiences.
- Populate every screen with realistic Kochi and Dubai data and direct, understandable actions.
- Establish the supplied warm off-white, indigo, lime, semantic colors, Inter/Figtree typography, precise rounded surfaces, and restrained motion as reusable design tokens.
- Add responsive behavior for desktop, touchscreen, tablet, mobile, and kitchen contexts.

## Interaction priorities
- Fast product ordering and order-state changes.
- Actionable owner alerts instead of card-heavy reporting.
- Unified order handling across dine-in, direct, Swiggy, and Zomato.
- Clear table and inventory states that do not rely on color alone.
- Regional currency, tax, language, and branch controls for India and GCC.

## Technical notes
- Keep the prototype frontend-only with realistic in-memory demo data.
- Use the existing TanStack Start structure and a single product route with view state.
- Use semantic Tailwind v4 tokens and Lucide icons throughout.
