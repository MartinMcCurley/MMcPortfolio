# Project Template Usage Guide

This directory contains reusable templates for the Martin McCurley Portfolio website.

## project-template.html

A comprehensive template for creating new project detail pages. This template includes all the necessary structure, styling, and scripts needed for a professional project presentation.

### How to Use

1. Copy `project-template.html` to your project root directory
2. Rename it to your desired project filename (e.g., `project-5.html`)
3. Replace the placeholder values with your project-specific content

### Template Placeholders

Replace the following placeholders with your actual content:

#### Meta Information
- `{{PROJECT_TITLE}}` - The name of your project
- `{{PROJECT_DESCRIPTION}}` - Brief description for SEO and social media

#### Project Details
- `{{PROJECT_CLASS}}` - CSS class for styling (e.g., "stadiabt", "project5")
- `{{PROJECT_TYPE}}` - Project category (e.g., "Full-Stack", "Frontend", "Mobile")
- `{{PROJECT_YEAR}}` - Year the project was completed
- `{{PROJECT_TAGLINE}}` - Short, compelling description
- `{{PROJECT_OVERVIEW}}` - Detailed project overview paragraph
- `{{PROJECT_BANNER_IMAGE}}` - Path to the main project banner image

#### Detail Sections
The template includes 3 detailed sections, each with:
- `{{DETAIL_SECTION_X_TITLE}}` - Section heading
- `{{DETAIL_SECTION_X_PARAGRAPH_1}}` - First paragraph
- `{{DETAIL_SECTION_X_PARAGRAPH_2}}` - Second paragraph  
- `{{DETAIL_SECTION_X_IMAGE_PLACEHOLDER}}` - Image placeholder text

#### Technologies
- `{{TECHNOLOGY_TAGS}}` - HTML for technology tags, format:
  ```html
  <div class="technology-tag">React</div>
  <div class="technology-tag">Node.js</div>
  <div class="technology-tag">MongoDB</div>
  ```

### Example Replacement

```html
<!-- Before -->
<title>{{PROJECT_TITLE}} — Martin McCurley</title>

<!-- After -->
<title>Chat Application — Martin McCurley</title>
```

### Project Structure

The template includes:
- Complete HTML head with SEO meta tags
- Navigation header with logo and social links
- Project banner section with hero image
- Overview section with project description
- Three detailed content sections with alternating image/text layout
- Technologies section with tag display
- Footer with links and copyright

### Styling

All styling is handled through the existing CSS files:
- `css/main.css` - Primary styles
- `css/custom.css` - Custom overrides and enhancements

### Scripts

The template includes all necessary JavaScript:
- jQuery for DOM manipulation
- Locomotive Scroll for smooth scrolling
- WebFont loader for typography
- Custom animations and interactions

### Best Practices

1. **Images**: Optimize banner images for web (recommended: 1600x900px)
2. **Content**: Keep descriptions concise but informative
3. **Technologies**: List 6-8 key technologies used
4. **SEO**: Ensure project title and description are SEO-friendly
5. **Consistency**: Follow the same content structure across all projects

### Adding New Projects

1. Create new project file from template
2. Update navigation links if needed
3. Add project card to main index.html
4. Test responsive behavior across devices
5. Validate HTML and check for console errors

This template streamlines the process of creating professional project pages while maintaining consistency with the existing portfolio design. 