# Checklist: Step 5 - Integrate GitHub Content (Build-Time Fetch)

This step focuses on dynamically pulling your project information directly from your GitHub repositories (`MartinMcCurley/MMcPortfolio` seems to be your portfolio *code* repo, so you'll likely fetch from your *other project* repositories) to display on your portfolio. This data will be fetched **at build time** when you (or your CI/CD process) build the static site.

## Planning GitHub Integration
- [ ] **Identify Data to Fetch:**
    - [ ] For each project you want to showcase:
        - [ ] Repository Name
        - [ ] Repository Description
        - [ ] Primary Language
        - [ ] Topics/Tags
        - [ ] GitHub URL (for "View Code" link)
        - [ ] Homepage URL (if set in repo settings, for "Live Demo" link)
        - [ ] Last Updated Date (optional, to show recency)
        - [ ] Stargazers count (optional, social proof)
- [ ] **Curate Repositories:**
    - [ ] Decide which specific repositories you want to feature. It's better to showcase a few well-documented projects than many incomplete ones.
    - [ ] Alternatively, plan to fetch your pinned repositories.
- [ ] **API Strategy:**
    - [ ] **GitHub REST API:** The primary method.
        - [ ] Endpoint for user repos: `https://api.github.com/users/YOUR_USERNAME/repos`
        - [ ] Endpoint for pinned repos (requires GraphQL or scraping, or a more complex setup; for simplicity, consider fetching specific named repos or all and filtering if pinned data isn't easily accessible via REST without auth for *just* pinned status).
        - [ ] Consider fetching specific repo details: `https://api.github.com/repos/YOUR_USERNAME/REPO_NAME`
    - [ ] **Authentication (Optional but Recommended for Higher Rate Limits):**
        - [ ] Generate a GitHub Personal Access Token (PAT) with `public_repo` scope. This increases API rate limits.
        - [ ] **Important:** Store this token securely (e.g., in a local `.env` file, NOT committed to Git). It will be used during the local build process and later in GitHub Actions secrets.

## Implementation (During Local Build Process)
This will vary slightly based on your chosen framework (Astro, SvelteKit, Next.js). The general idea is to fetch data in a script that runs when the site is built.

- [ ] **Setup Environment Variable for PAT (Local):**
    - [ ] Create a `.env` file in your project root (ensure it's in `.gitignore`).
    - [ ] Add your PAT: `GITHUB_TOKEN=your_personal_access_token`
- [ ] **Data Fetching Script/Logic:**
    - [ ] **Astro:** Fetch data within the frontmatter script of an `.astro` file or in a global data fetching script that generates JSON.
        ```javascript
        // Example concept for Astro frontmatter
        ---
        const response = await fetch('https://api.github.com/users/MartinMcCurley/repos?sort=updated&per_page=6', {
          headers: process.env.GITHUB_TOKEN ? { 'Authorization': `token ${process.env.GITHUB_TOKEN}` } : {}
        });
        const repos = await response.json();
        // Filter or map repos as needed
        const desiredRepoNames = ["repo1", "repo2", "project-alpha"]; // Example: list of specific repos to show
        const filteredRepos = repos.filter(repo => desiredRepoNames.includes(repo.name));
        ---
        ```
    - [ ] **SvelteKit (Static):** Fetch data in a `+page.server.js` (if pre-rendering all data) or a script imported by your components/pages that runs at build time. The data can then be passed as props.
    - [ ] **Next.js (Static Export):** Use `getStaticProps` in your page components to fetch data at build time.
        ```javascript
        // Example concept for Next.js getStaticProps
        export async function getStaticProps() {
          const response = await fetch('https://api.github.com/users/MartinMcCurley/repos?sort=updated&per_page=6', {
            headers: process.env.GITHUB_TOKEN ? { 'Authorization': `token ${process.env.GITHUB_TOKEN}` } : {}
          });
          let repos = await response.json();
          // Filter or map repos...
          const desiredRepoNames = ["repo1", "repo2", "project-alpha"]; // Example
          repos = repos.filter(repo => desiredRepoNames.includes(repo.name));
          return { props: { repos } };
        }
        ```
- [ ] **Project Data Structure:** Define a consistent structure for your project objects after fetching and processing (e.g., `{ name, description, url, demoUrl, language, topics, lastUpdated }`).
- [ ] **Filtering/Mapping:**
    - [ ] If fetching all repos, filter down to only the ones you want to display (e.g., by name, or if they have a specific topic like "portfolio").
    - [ ] Map the raw API response fields to your desired project data structure.
    - [ ] Handle cases where a repository might be missing a description or homepage URL.
- [ ] **Display Fetched Data:**
    - [ ] Pass the fetched project data to your "Projects Showcase" section/component.
    - [ ] Loop through the data to generate the project cards dynamically.
    - [ ] Ensure links (GitHub repo, live demo) are correctly populated.
- [ ] **Error Handling & Fallbacks:**
    - [ ] Consider what happens if the GitHub API call fails during build (e.g., log an error, build with empty projects data or placeholder data). For a static build, if the API fails, the build might fail or proceed with no data.
    - [ ] Ensure your local build process can access the `GITHUB_TOKEN` from the `.env` file (e.g., using `dotenv` package if not handled by the framework).

## Testing Local Build with GitHub Data
- [ ] **Verify `.env` is working:** Ensure your GITHUB_TOKEN is being loaded and used for API calls locally.
- [ ] **Run Local Build:** Execute `npm run build`.
- [ ] **Inspect Output:** Check that the generated static HTML files contain the project information fetched from GitHub.
- [ ] **Check Links:** Verify that links to GitHub repositories and live demos are correct.

## Security Note
- [ ] **Never commit your `.env` file or PAT directly into your Git repository.** Add `.env` to your `.gitignore` file. The PAT will be handled via GitHub Secrets for automated deployment (Step 7).

By completing this checklist, your portfolio will dynamically showcase your selected GitHub projects, with the data embedded directly into the static HTML at build time. This keeps your live site fast as no client-side API calls are needed to display initial project info.