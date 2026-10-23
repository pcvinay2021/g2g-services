G2G SERVICES — CATEGORY PRODUCT PAGE PATCH

This patch adds:
- Main /products page grouped by category, with up to 4 published API products per category.
- A “More Products” link for each category.
- A separate /products/category/:slug page that shows the full published product list for that category.
- Search on the main page and category page.
- Keeps the existing AdminProducts route from the product-management patch version of App.jsx.

Important:
- This uses the backend /api/products endpoint only. It does not restore static/demo products or delete/edit database records.
- Categories without published products remain visible on the main page with an empty-state message; add and publish products in Admin to populate them.
- Apply locally, run `npm run build` in the client folder, and test before deploying.
- This ZIP includes App.jsx from the latest uploaded product-management patch. If your local App.jsx has newer changes than that patch, compare before replacing it so no newer routes are lost.
