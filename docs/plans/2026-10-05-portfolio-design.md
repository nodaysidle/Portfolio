# NODAYSIDLE — Editorial engineering atelier

Approved direction: warm off-white, ink typography, burnt-orange signal, generous editorial spacing. A contour field is the memorable hero motif, animated lightly using native CSS. Selected work comes from the owner's structured GitHub profile, not fabricated endorsements.

Architecture: zero-dependency Node static generator reads data/profile.json and data/presentation.json, renders src/index.html, and copies public assets into dist. Native JavaScript progressively enhances filtering and motion. Content remains accessible without JavaScript. Static build is offline and deterministic; explicit sync updates upstream profile data.

Sections: anchored navigation; hero with contour artwork and studio details; five flagship projects with stacks and repository links; about and four operating principles; stack; email/GitHub contact; footer. Repository screenshots are preferred; custom diagrams are explicitly described as illustrative rather than product screenshots.

Accessibility: semantic landmarks, skip link, visible focus, useful image alternatives, native buttons, reduced motion, no hiding content without enhancement. Testing: Node build/content tests and browser checks at phone and desktop sizes, filters, navigation, no overflow, console and image loading. Vercel deployment via existing CLI credentials if valid. No claims of verified performance for upstream projects and no inflated repository counts copied from stale profile stats.
