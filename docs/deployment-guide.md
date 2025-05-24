# Deployment Guide: Martin McCurley Portfolio to GoDaddy

This guide walks through deploying the portfolio to GoDaddy Deluxe hosting with automated GitHub Actions deployment.

## Prerequisites

- ✅ Portfolio built and tested locally
- ✅ GoDaddy Deluxe hosting account
- ✅ Domain `martinmccurley.com` configured
- ✅ GitHub repository with portfolio code

## Option 1: Automated Deployment (Recommended)

### Step 1: Get GoDaddy FTP Credentials

1. **Login to GoDaddy cPanel**
   - Go to your GoDaddy hosting dashboard
   - Click "cPanel" to access the control panel

2. **Find FTP Account Information**
   - In cPanel, look for "FTP Accounts" or "File Manager"
   - Note down your FTP server address (usually `ftp.martinmccurley.com` or an IP)
   - Your FTP username (often your cPanel username)
   - Your FTP password (your cPanel password or create a new FTP account)

### Step 2: Configure GitHub Secrets

1. **Go to GitHub Repository Settings**
   - Navigate to `https://github.com/MartinMcCurley/MMcPortfolio`
   - Click "Settings" tab
   - Go to "Secrets and variables" → "Actions"

2. **Add Repository Secrets**
   Click "New repository secret" and add these:
   
   - **Name:** `FTP_SERVER`
     **Value:** Your FTP server (e.g., `ftp.martinmccurley.com`)
   
   - **Name:** `FTP_USERNAME`
     **Value:** Your FTP username
   
   - **Name:** `FTP_PASSWORD`
     **Value:** Your FTP password
   
   - **Name:** `FTP_REMOTE_DIR` (Optional)
     **Value:** `./public_html/` (or leave empty for default)

### Step 3: Trigger Deployment

1. **Automatic Deployment**
   - Any push to the `main` branch will trigger deployment
   - Check the "Actions" tab in GitHub to monitor progress

2. **Manual Deployment**
   - Go to "Actions" tab in GitHub
   - Click "Deploy Portfolio to GoDaddy"
   - Click "Run workflow" → "Run workflow"

### Step 4: Monitor Deployment

1. **Check GitHub Actions**
   - Go to the "Actions" tab
   - Click on the latest workflow run
   - Monitor each step for success/failure

2. **Common Issues & Solutions**
   - **FTP Connection Failed:** Check server address and credentials
   - **Permission Denied:** Ensure FTP user has write access to public_html
   - **Build Failed:** Check for code errors in the build step

## Option 2: Manual Deployment

### Step 1: Build Locally

```bash
npm run build
```

This creates the `out/` directory with all static files.

### Step 2: Upload via cPanel File Manager

1. **Access cPanel File Manager**
   - Login to GoDaddy cPanel
   - Open "File Manager"
   - Navigate to `public_html/`

2. **Clear Existing Files (if needed)**
   - ⚠️ **CAUTION:** Backup any existing files first
   - Delete old website files from `public_html/`

3. **Upload New Files**
   - **Method A: Zip Upload**
     - Zip the contents of the `out/` folder (not the folder itself)
     - Upload the zip file to `public_html/`
     - Extract the zip file in place
   
   - **Method B: FTP Client**
     - Use FileZilla, Cyberduck, or similar
     - Connect using your FTP credentials
     - Upload all contents of `out/` to `public_html/`

### Step 3: Verify Upload

- Check that `index.html` is in `public_html/`
- Verify `.htaccess` file is present
- Ensure `_next/` directory and all assets are uploaded

## Post-Deployment Configuration

### SSL Certificate Setup

1. **Enable AutoSSL in cPanel**
   - Look for "SSL/TLS Status" or "AutoSSL"
   - Ensure SSL is enabled for `martinmccurley.com` and `www.martinmccurley.com`
   - GoDaddy usually provides free SSL certificates

2. **Force HTTPS**
   - The `.htaccess` file already includes HTTPS redirect rules
   - Test by visiting `http://martinmccurley.com` (should redirect to HTTPS)

### Domain Configuration

1. **Primary Domain Setup**
   - Ensure `martinmccurley.com` is set as the primary domain
   - DNS should point to your GoDaddy hosting IP

2. **WWW Redirect**
   - Configure `www.martinmccurley.com` to redirect to `martinmccurley.com`
   - This is usually handled automatically by GoDaddy

## Testing Your Live Site

### Functionality Tests

- [ ] Visit `https://martinmccurley.com`
- [ ] Test all navigation links
- [ ] Verify project links work
- [ ] Check contact form/email links
- [ ] Test on mobile devices
- [ ] Verify GitHub project data loads

### Performance Tests

- [ ] Run Lighthouse audit on live site
- [ ] Test loading speed from different locations
- [ ] Verify GZIP compression is working
- [ ] Check browser caching headers

### Security Tests

- [ ] Verify SSL certificate is active (green padlock)
- [ ] Test HTTPS redirect from HTTP
- [ ] Check security headers are present

## Maintenance & Updates

### Automated Updates (GitHub Actions)

1. **Make Changes Locally**
   - Edit code in your local repository
   - Test changes with `npm run dev`

2. **Deploy Changes**
   - Commit changes: `git add . && git commit -m "Update description"`
   - Push to GitHub: `git push`
   - GitHub Actions will automatically deploy

### Manual Updates

1. **Build Locally**
   - Run `npm run build` after making changes
   - Upload new `out/` contents to `public_html/`

### Monitoring

- **GitHub Actions:** Check the Actions tab for deployment status
- **Error Logs:** Monitor cPanel error logs for any issues
- **Analytics:** Consider adding Google Analytics for traffic monitoring

## Troubleshooting

### Common Issues

1. **Site Not Loading**
   - Check DNS propagation (can take 24-48 hours)
   - Verify files are in `public_html/` not a subdirectory
   - Check for `.htaccess` syntax errors

2. **GitHub Actions Failing**
   - Verify all secrets are set correctly
   - Check FTP credentials and permissions
   - Review action logs for specific error messages

3. **SSL Issues**
   - Wait for AutoSSL to provision (can take a few hours)
   - Contact GoDaddy support if SSL doesn't activate

4. **Performance Issues**
   - Verify `.htaccess` caching rules are working
   - Check if GZIP compression is enabled
   - Optimize images if needed

### Getting Help

- **GoDaddy Support:** For hosting-related issues
- **GitHub Issues:** For code-related problems
- **Documentation:** Refer to Next.js and GoDaddy documentation

## Success Checklist

- [ ] Site loads at `https://martinmccurley.com`
- [ ] All pages and links work correctly
- [ ] SSL certificate is active
- [ ] GitHub Actions deployment works
- [ ] Performance scores are good (Lighthouse 90+)
- [ ] Site is mobile-responsive
- [ ] Contact information works
- [ ] Project data loads from GitHub API

🎉 **Congratulations!** Your portfolio is now live and professionally deployed! 