# Checklist: Step 7 - Deployment to GoDaddy Deluxe and Hosting

This is the final step: deploying your optimized, statically built portfolio to your GoDaddy Deluxe hosting account and configuring your custom domain `MartinMcCurley.com`.

## Pre-Deployment Final Checks
- [ ] **Production Build:** Ensure you have created a final production build of your website locally.
    - [ ] Astro: `npm run build` (output in `dist/`)
    - [ ] SvelteKit (static): `npm run build` (output in `build/` or as configured)
    - [ ] Next.js (static): `npm run build` (output in `out/`)
    - [ ] Plain HTML/CSS: Your organized project folder.
- [ ] **Verify Build Output:** Briefly inspect the contents of your build output folder (`dist/`, `build/`, `out/`) to ensure all necessary files (`index.html`, CSS, JS, images, assets) are present.
- [ ] **`.htaccess` File:** Prepare your `.htaccess` file.
    - [ ] **SPA Routing (if needed, e.g., for Next.js/SvelteKit static with client-side routing):**
      ```apache
      <IfModule mod_rewrite.c>
        RewriteEngine On
        # If the requested resource is not a file
        RewriteCond %{REQUEST_FILENAME} !-f
        # And the requested resource is not a directory
        RewriteCond %{REQUEST_FILENAME} !-d
        # Then rewrite all other requests to index.html (or your entry point)
        RewriteRule . /index.html [L]
      </IfModule>
      ```
    - [ ] **Caching Rules (Recommended):**
      ```apache
      <IfModule mod_expires.c>
        ExpiresActive On
        ExpiresByType image/jpeg "access plus 1 year"
        ExpiresByType image/png "access plus 1 year"
        ExpiresByType image/gif "access plus 1 year"
        ExpiresByType image/svg+xml "access plus 1 year"
        ExpiresByType text/css "access plus 1 month"
        ExpiresByType application/javascript "access plus 1 month"
        ExpiresByType application/x-javascript "access plus 1 month"
        ExpiresDefault "access plus 7 days"
      </IfModule>
      <IfModule mod_headers.c>
        # For assets where you don't control the filename (e.g. from a CDN or third party)
        # but you want to ensure they are revalidated, or for your HTML files.
        # This example tells the browser to revalidate HTML files every time.
        <FilesMatch "\.(html|htm)$">
          Header set Cache-Control "no-cache, must-revalidate"
        </FilesMatch>
      </IfModule>
      ```
    - [ ] **Force HTTPS (Recommended):**
      ```apache
      <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteCond %{HTTPS} off
        RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
      </IfModule>
      ```
    - [ ] Place this `.htaccess` file in the root of your build output folder (so it gets uploaded to `public_html` or your target directory).

## Option 1: Manual Deployment via GoDaddy cPanel
This is a straightforward way to get your site live.

- [ ] **Login to GoDaddy:** Access your GoDaddy account and navigate to your Web Hosting cPanel.
- [ ] **Open File Manager:** Locate and open the "File Manager" tool in cPanel.
- [ ] **Navigate to Deployment Directory:**
    - [ ] Typically `public_html` for your primary domain (`MartinMcCurley.com`).
    - [ ] If `MartinMcCurley.com` is an addon domain, navigate to its specific document root.
    - [ ] **Backup (Optional but Wise):** If there are existing files in `public_html` you want to save, back them up first.
    - [ ] **Clear Existing Files (Caution!):** If you are replacing an old site, you might need to delete existing files from `public_html` (be very careful).
- [ ] **Upload Files:**
    - [ ] **Method 1: Upload & Extract Zip:**
        - [ ] Zip the *contents* of your local build output folder (e.g., all files and folders inside `dist/`).
        - [ ] In File Manager, use the "Upload" button to upload the zip file.
        - [ ] Once uploaded, select the zip file and click "Extract." Ensure it extracts to the correct directory (`public_html`).
    - [ ] **Method 2: FTP/SFTP Client (e.g., FileZilla, Cyberduck):**
        - [ ] Get your FTP credentials from GoDaddy cPanel (FTP Accounts section).
        - [ ] Connect to your server using an FTP client.
        - [ ] Navigate to the remote `public_html` directory.
        - [ ] Upload the *contents* of your local build output folder. This might take longer but gives more control.
- [ ] **Verify `.htaccess`:** Ensure your `.htaccess` file is uploaded correctly to `public_html` and is a hidden file (starts with a dot). You might need to enable "Show Hidden Files" in cPanel File Manager settings.

## Option 2: Automated Deployment via GitHub Actions (Recommended for ongoing updates)
This sets up a CI/CD pipeline to build and deploy your site automatically when you push to GitHub.

- [ ] **Store FTP/SFTP Credentials in GitHub Secrets:**
    - [ ] In your `MartinMcCurley/MMcPortfolio` GitHub repository, go to `Settings` > `Secrets and variables` > `Actions`.
    - [ ] Add the following repository secrets:
        - [ ] `FTP_SERVER`: Your GoDaddy FTP server address (e.g., `ftp.MartinMcCurley.com` or IP address).
        - [ ] `FTP_USERNAME`: Your GoDaddy FTP username.
        - [ ] `FTP_PASSWORD`: Your GoDaddy FTP password.
        - [ ] `FTP_REMOTE_DIR` (Optional): The remote directory on the server, e.g., `./public_html/` (the exact path might need `./` or `/` depending on the action). Default is usually root.
- [ ] **Create GitHub Actions Workflow File:**
    - [ ] In your project, create a file: `.github/workflows/deploy.yml`.
    - [ ] Add the workflow configuration (example using a popular FTP Deploy Action):
      ```yaml
      name: Deploy Portfolio to GoDaddy

      on:
        push:
          branches:
            - main # Or your primary branch

      jobs:
        build-and-deploy:
          runs-on: ubuntu-latest
          steps:
            - name: Checkout code
              uses: actions/checkout@v4

            - name: Set up Node.js
              uses: actions/setup-node@v4
              with:
                node-version: '20' # Specify your Node.js version

            - name: Install dependencies
              run: npm install # Or pnpm install / yarn install

            - name: Build static site
              run: npm run build # Your build command
              env:
                GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # If your build fetches from GitHub API

            # Prepare .htaccess if not already in build output
            # - name: Create .htaccess
            #   run: |
            #     echo '<IfModule mod_rewrite.c>
            #     RewriteEngine On
            #     RewriteCond %{REQUEST_FILENAME} !-f
            #     RewriteCond %{REQUEST_FILENAME} !-d
            #     RewriteRule . /index.html [L]
            #     </IfModule>
            #     # Add caching and HTTPS rules here
            #     ' > your_build_output_folder/.htaccess # Adjust path

            - name: FTP Deploy
              uses: SamKirkland/FTP-Deploy-Action@v4.3.4 # Or another FTP/SFTP action
              with:
                server: ${{ secrets.FTP_SERVER }}
                username: ${{ secrets.FTP_USERNAME }}
                password: ${{ secrets.FTP_PASSWORD }}
                local-dir: ./your_build_output_folder/ # Path to your build output, e.g., ./dist/ or ./out/
                remote-dir: ${{ secrets.FTP_REMOTE_DIR || './public_html/' }} # Target directory on GoDaddy
                # sftp: true # Uncomment if using SFTP (requires SFTP server and port 22 usually)
                # port: 21 # Default for FTP, 22 for SFTP
                # dangerous-clean-slate: true # OPTIONAL: Deletes all files in remote-dir before uploading. USE WITH EXTREME CAUTION.
      ```
    - [ ] **Adjust `your_build_output_folder`** to match your framework (e.g., `dist`, `build`, `out`).
    - [ ] **Commit and push** this workflow file to your GitHub repository. This will trigger the first deployment.
- [ ] **Monitor GitHub Actions:** Check the "Actions" tab in your GitHub repository to see the workflow run. Troubleshoot any errors.

## Configure Custom Domain (`MartinMcCurley.com`) and SSL
- [ ] **DNS Settings (Usually Pre-configured):**
    - [ ] If `MartinMcCurley.com` is the primary domain for your GoDaddy Deluxe hosting, its DNS A record should already point to your hosting IP address.
    - [ ] If it's an addon domain, ensure it's correctly set up in cPanel and its DNS points to your GoDaddy hosting.
- [ ] **Install/Verify SSL Certificate:**
    - [ ] In GoDaddy cPanel, look for "SSL/TLS Status" or "AutoSSL".
    - [ ] Ensure an SSL certificate is active for `MartinMcCurley.com` and `www.MartinMcCurley.com`. GoDaddy usually provides and auto-renews a free SSL.
    - [ ] If not active, try to run AutoSSL or follow GoDaddy's instructions to install the free SSL.
    - [ ] The `.htaccess` rule to force HTTPS will ensure visitors use the secure version.

## Post-Deployment Testing
- [ ] **Visit Your Domain:** Open `https://MartinMcCurley.com` in your browser.
- [ ] **Thorough Testing:**
    - [ ] Test all pages/sections.
    - [ ] Test all links (internal, external, project links, resume link).
    - [ ] Test responsiveness on different devices/screen sizes.
    - [ ] Check if animations and interactions work as expected.
    - [ ] Verify GitHub-fetched project data is correct.
    - [ ] Check browser console for any errors.
    - [ ] Confirm SSL certificate is working (padlock icon in browser).
- [ ] **Speed Test Live Site:** Run Lighthouse or other speed tests on the live URL.

## Maintenance Plan (Brief)
- [ ] **Updates:** For content updates, modify your code locally, commit, and push to GitHub. If GitHub Actions is set up, it will redeploy automatically. Otherwise, repeat manual upload.
- [ ] **Dependency Updates:** Periodically update project dependencies locally and test thoroughly before deploying.

You've now successfully deployed your modern developer portfolio!