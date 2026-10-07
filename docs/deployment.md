# Production deployment

Production: https://nodaysidle-portfolio-nine.vercel.app

Vercel project: `muhambals-projects/nodaysidle-portfolio` (new project in the authenticated account; existing project-pages site was not modified).

## Verification

- Public unauthenticated HTTP request returned **200**, with the configured CSP, referrer, framing and permissions headers. Vercel CLI warns that deployment protection is enabled for deployment URLs, but the production alias is publicly accessible and was tested in a fresh automated browser.
- Five GitHub-sourced projects render with optimized, locally hosted WebP artwork. All five images loaded.
- Desktop at 1440px and mobile at 390px visually inspected; overflow checks at 320px, 390px, 768px and 1440px passed.
- Filters verified: native apps 3, AI & tooling 2, all 5.
- Reduced-motion emulation returns `animation-name: none` for the hero contour field.
- No browser page errors observed.
- Native Node tests: 3 passed (escaping, URL safety, generated content and asset/anchor resolution).
- Axe 4.12.1 reported no violations. An incomplete ARIA-label check was resolved by giving stack groups an explicit role. Decorative contour artwork produces automated contrast checks requiring manual inspection; it is aria-hidden and carries no essential information.

To redeploy from this linked directory:

```sh
npm test
npx vercel --prod
```

To enable continuous deployment, publish the source to your GitHub repo and connect it to this Vercel project. No source has been pushed to GitHub automatically.
