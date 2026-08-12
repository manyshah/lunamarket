# Luna Market — Portfolio Edition

A premium RTL beauty e-commerce frontend demo built as a portfolio project.

## Highlights

- Premium responsive RTL storefront
- 10-second auto-playing hero slider with smooth transitions
- Live search overlay
- Product catalog, category filters and sorting
- Product detail pages
- Wishlist persistence with `localStorage`
- Cart with quantity controls and demo coupon (`LUNA10`)
- Multi-step demo checkout
- Demo authentication with phone + OTP (`12345`)
- Profile and demo order history
- Visual order-tracking timeline
- Mobile drawer navigation
- GitHub Pages deployment workflow
- HashRouter setup to avoid route 404s on static hosting

## Tech stack

- React
- TypeScript
- Vite
- React Router
- Lucide React
- Handcrafted responsive CSS

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## GitHub Pages deployment

1. Create a new GitHub repository.
2. Upload this project to the repository root.
3. Commit and push to the `main` branch.
4. In **Settings → Pages**, select **GitHub Actions** as the source.
5. The included workflow will build and deploy the site automatically.

## Demo credentials

- OTP: `12345`
- Coupon: `LUNA10`
- Tracking code: `LN-140500`

## Notes

This is a frontend portfolio demo. Payment, SMS, inventory, shipping, and account operations are simulated and are intentionally not connected to production services.
