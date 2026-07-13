# Walid El Khoukh — Portfolio

Personal portfolio for Walid El Khoukh, combining an AI Lab for experiments and writing with a professional Data Engineer profile.

## Structure

- `index.html` — English portfolio
- `fr/index.html` — French portfolio
- `monelu/` — English MonÉlu case study
- `fr/monelu/` — French MonÉlu case study
- `assets/` — optimized portraits, social preview, and browser icons

## Deployment

The front end is static and can be deployed to Vercel without a build command; `/api/contact` runs as a serverless function.

## Contact form

The form uses the Vercel function at `/api/contact` and Resend. Before enabling it in production:

1. Verify `walidelkhoukh.com` as a sending domain in Resend.
2. Add `RESEND_API_KEY` to the Vercel project's Production environment variables.
3. Optionally add `CONTACT_TO_EMAIL`; it defaults to `contact@walidelkhoukh.com`.
4. Redeploy, then send one test message from the live site.

Direct email and LinkedIn links remain available if the form service is unavailable.

## Analytics

The site uses cookie-free Vercel Web Analytics for visits and queues these custom events:

- `Mode View` - initial Perso view and Pro/Perso switches
- `MonElu Click` - navigation, feature, and product clicks
- `CV Download` - English or French download
- `Contact Click` - direct email intent

Enable Web Analytics in the Vercel project dashboard and redeploy. Page views are available on all plans; Vercel custom events require a Pro or Enterprise plan.
