# Project Guidelines

## Project rules
- Site chrome (Preloader, Header, Footer) lives in `src/components/site` and is mounted once in `__root`; the Preloader also shows a short curtain on every pathname change, so pages must not add their own page-level loaders.
- Shared copy/contact data lives in `src/lib/site.ts` and `src/lib/content.ts` so contact details change in one place.
