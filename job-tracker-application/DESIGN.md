# Career Architect Design Notes

This app implementation is based on the prototype direction in `stitch_add_edit_job/career_flow/DESIGN.md`.

## Principles
- Preserve the editorial, executive tone rather than collapsing to generic dashboard UI.
- Use tonal layering and spacious layouts instead of heavy borders.
- Keep typography led by **Manrope** headlines and **Inter** body copy.
- Reuse a single blue-led palette with mint accents for success states.

## Implementation Notes
- Shared colors, typography, and surface utilities live in `tailwind.config.ts` and `app/globals.css`.
- Route pages are implemented as reusable React/Tailwind compositions rather than static HTML copies.
- The prototype folder remains intact as a visual reference source.