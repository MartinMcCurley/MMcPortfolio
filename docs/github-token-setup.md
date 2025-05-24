# GitHub Personal Access Token Setup

To enable GitHub integration in your portfolio, you'll need to create a Personal Access Token (PAT) to increase API rate limits and ensure reliable data fetching.

## Step 1: Generate a GitHub Personal Access Token

1. **Go to GitHub Settings:**
   - Visit: https://github.com/settings/personal-access-tokens/tokens
   - Or navigate: GitHub → Profile → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Create New Token:**
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a descriptive name like "MMcPortfolio API Access"
   - Set expiration (recommend: 90 days or 1 year)

3. **Select Scopes:**
   - **Only check `public_repo`** (this is all you need for public repositories)
   - This allows reading public repository information

4. **Generate and Copy:**
   - Click "Generate token"
   - **IMPORTANT:** Copy the token immediately - you won't see it again!

## Step 2: Add Token to Your Local Environment

1. **Open your `.env` file** (already created in your project root)

2. **Replace the placeholder:**
   ```bash
   # Replace this line:
   GITHUB_TOKEN=your_github_personal_access_token_here
   
   # With your actual token:
   GITHUB_TOKEN=ghp_your_actual_token_here
   ```

3. **Save the file**

## Step 3: Test the Integration

1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Visit http://localhost:3000**
   - Your Projects section should now show real GitHub repositories
   - If it shows fallback projects, check the console for API errors

## Security Notes

- ✅ **`.env` is already in `.gitignore`** - your token won't be committed
- ✅ **Only public repository access** - minimal security risk
- ✅ **Used only at build time** - not exposed to the client

## Troubleshooting

### No Real Projects Showing?
- Verify your token is correctly added to `.env`
- Check browser console for API errors
- Ensure you have public repositories with descriptions

### Rate Limit Issues?
- The token increases rate limits from 60/hour to 5000/hour
- If still hitting limits, consider adding more specific repository filtering

### Token Expired?
- Generate a new token following the same steps
- Update your `.env` file with the new token

## For Deployment (Later)

When deploying to GoDaddy or GitHub Pages, you'll add this token as a secret environment variable in your deployment pipeline. For now, the local `.env` file is sufficient for development and testing.

## Current Integration Features

With the token set up, your portfolio will:
- Fetch your latest public repositories
- Display repository descriptions, languages, and topics
- Show GitHub star counts
- Filter out forks and repositories without descriptions
- Provide direct links to repositories and live demos
- Fall back gracefully if the API is unavailable 