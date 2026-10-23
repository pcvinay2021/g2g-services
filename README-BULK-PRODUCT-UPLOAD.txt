G2G SERVICES — BULK PRODUCT UPLOAD PATCH

IMPORTANT
- This patch intentionally keeps client/src/data/products.js EMPTY. It does not restore any old/static/demo products.
- Existing database products are not deleted or changed by this patch.
- Apply locally and build/test before deploying.

ADMIN BULK UPLOAD FLOW
1. Open Admin Portal > Product Management.
2. Download Excel Template (CSV; opens in Excel). Keep the header names unchanged. You may also save the filled sheet as .xlsx.
3. Create an Images ZIP containing JPG/JPEG/PNG/WEBP files. In the Excel Image File column, use each exact filename.
4. Create a Catalogs ZIP containing official PDF datasheets/catalogs. In Catalog PDF, use the exact PDF filename. These two ZIPs are optional if no files are available.
5. Click Upload & Preview. Every row is checked for SKU, category, prices, duplicate SKU and missing referenced files.
6. Fix errors and re-upload. Confirm Import is enabled only when all rows are valid.
7. Images and PDFs are uploaded to Cloudinary if CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET are configured; otherwise they are stored in server/src/uploads/products. Cloudinary is recommended for Render production because local filesystem uploads may be lost on redeploy/restart.

CATEGORIES
CCTV Surveillance; Access Control; Biometric; Networking; Fire Alarm; EPABX / Intercom; Power Backup; IT Hardware; Other

SERVER DEPENDENCIES
The server/package.json adds adm-zip and xlsx. Running npm install in server will install them and update package-lock.json. Commit package-lock.json after testing.

SAFETY
- Upload endpoint requires adminAuth token.
- Import uses preview then explicit confirmation. No products are deleted.
- Use only manufacturer-provided or otherwise authorized product images and PDF catalogs.
- For durable media on Render, configure the existing Cloudinary environment variables in the API service. Without them, uploads fall back to local storage and may be lost on redeploy/restart.
