# Design System Strategy: The Career Architect

## 1. Overview & Creative North Star
This design system moves away from the "spreadsheet" feel of traditional job trackers. Our Creative North Star is **"The Editorial Executive."** We are treating the job search not as a chore, but as a high-stakes curation of a professional future. 

The system breaks the "standard template" look by utilizing **Intentional Asymmetry** and **Tonal Depth**. Instead of rigid grids, we use generous whitespace (`spacing-16` and `spacing-24`) and overlapping surface layers to create a sense of focused calm. This isn't just a tool; it’s a premium workspace that commands authority through sophisticated typography and architectural layering.

---

## 2. Colors & Surface Architecture
The palette is rooted in deep, authoritative blues (`primary: #002c53`) and crisp, clean surfaces (`surface: #f6fafe`). 

### The "No-Line" Rule
Standard 1px borders are strictly prohibited for sectioning. They create visual noise and "trap" the content. Instead, define boundaries through **Background Color Shifts**. 
- Use `surface_container_low` for the main background.
- Use `surface_container_lowest` (Pure White) for active content areas to create a natural, "paper-on-desk" lift.
- Use `surface_container` for secondary sidebars or utility zones.

### The "Glass & Gradient" Rule
To avoid a flat, "Bootstrap" appearance:
- **Glassmorphism:** For floating navigation or modals, use `surface_container_lowest` at 80% opacity with a `backdrop-blur` of 12px.
- **Signature Gradients:** Main CTAs should utilize a subtle linear gradient from `primary` (#002c53) to `primary_container` (#1a426e) at a 135-degree angle. This adds "soul" and a tactile, premium finish.

---

## 3. Typography: The Editorial Hierarchy
We utilize a pairing of **Manrope** (Display/Headline) for a modern, architectural feel and **Inter** (Title/Body/Label) for peak legibility.

*   **Display & Headlines (Manrope):** Use `display-md` for dashboard greetings to establish an immediate "Executive" tone. Use `headline-sm` for section headers (e.g., "Active Applications").
*   **Body & Labels (Inter):** High-density information, like job descriptions, must use `body-md`. Use `label-md` in `on_surface_variant` (#43474f) for metadata like "Applied 2 days ago."
*   **The Power Scale:** Large typographic shifts (e.g., a `display-sm` title next to a `label-md` date) create an editorial rhythm that guides the eye far better than lines or boxes.

---

## 4. Elevation & Depth: Tonal Layering
We reject traditional drop shadows in favor of **Ambient Light** and **Tonal Stacking**.

*   **The Layering Principle:** Depth is achieved by nesting. A `surface_container_lowest` card sits atop a `surface_container_low` background. This creates a "soft lift" that feels architectural rather than digital.
*   **Ambient Shadows:** If a card requires a floating state (e.g., during a drag-and-drop interaction), use a highly diffused shadow: `box-shadow: 0 20px 40px rgba(0, 44, 83, 0.06)`. Notice the shadow is tinted with the `primary` blue, not black.
*   **The "Ghost Border" Fallback:** For accessibility in form fields, use the `outline_variant` (#c3c6d0) at **20% opacity**. It should be felt, not seen.

---

## 5. Components: Precision & Clarity

### Job Cards
Forbid the use of divider lines. Separate the Job Title (`title-lg`) from the Company Name (`body-md`) using `spacing-1`. 
- **Layout:** Use `spacing-5` padding.
- **Background:** Always `surface_container_lowest`.
- **Status Indicator:** Use a vertical "accent bar" (4px wide) on the left edge using `tertiary_fixed` (#6ffbbe) for Offers or a custom Amber for Interviewing, rather than coloring the whole card.

### Intuitive Form Elements
- **Input Fields:** Use `surface_container_highest` (#dfe3e7) as the fill color with a bottom-only "Ghost Border." This mimics a high-end stationery aesthetic.
- **Primary Buttons:** Utilize `rounded-md` (0.375rem). The label should be `label-md` in `on_primary` (#ffffff), uppercase with 0.05em letter spacing for an authoritative "Action" feel.
- **Status Chips:** Use `tertiary_container` for "Offer" status. The text should be `on_tertiary_container` (#29c48b). Chips should have `rounded-full` corners to contrast against the architectural squareness of the cards.

### Relevant App Components
- **The Progress Stepper:** Use a non-linear "Timeline" view. Instead of a bar, use `surface_dim` vertical tracks with `primary` nodes to show the journey from "Applied" to "Offer."
- **Empty State "Canvas":** When no jobs are tracked, do not show a gray icon. Use a `display-sm` typographic prompt centered in the frame to maintain the editorial feel.

---

## 6. Do's and Don'ts

### Do
*   **Do** use `spacing-10` and `spacing-12` for "breathing room" between major sections.
*   **Do** use `on_surface_variant` for secondary text to maintain a soft, high-end contrast.
*   **Do** use `rounded-xl` for large modal containers to make the "Executive" space feel approachable.

### Don't
*   **Don't** use 100% black (#000000). Always use `on_background` (#171c1f) for text to keep the palette sophisticated.
*   **Don't** use "Standard Blue" for links. Use `primary` with a 2px `surface_tint` underline.
*   **Don't** crowd the interface. If a screen feels busy, increase the spacing tokens rather than adding borders to separate elements.