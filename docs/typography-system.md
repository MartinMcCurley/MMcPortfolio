# Typography System - Martin McCurley Portfolio

## Font Selection
Based on research requirements for minimalist futuristic aesthetic.

### Primary Font (Headings)
**Inter** - Modern, geometric sans-serif
- Clean, slightly futuristic feel
- Excellent readability on dark backgrounds
- High-quality system font alternative available
- Used for: H1, H2, H3, navigation, buttons

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
```

### Secondary Font (Body Text)
**Inter** (consistent with headings for minimalism)
- Single font family maintains design simplicity
- Different weights create hierarchy
- Optimized for performance (one font family)

## Typography Scale & Hierarchy

### Desktop Scale
```css
--font-size-h1: 3.5rem;    /* 56px - Hero name/title */
--font-size-h2: 2.5rem;    /* 40px - Section headings */
--font-size-h3: 1.75rem;   /* 28px - Subsection headings */
--font-size-body: 1.125rem; /* 18px - Main body text */
--font-size-small: 0.875rem; /* 14px - Captions, metadata */
```

### Mobile Scale (Responsive)
```css
--font-size-h1-mobile: 2.5rem;   /* 40px */
--font-size-h2-mobile: 2rem;     /* 32px */
--font-size-h3-mobile: 1.5rem;   /* 24px */
--font-size-body-mobile: 1rem;   /* 16px */
--font-size-small-mobile: 0.875rem; /* 14px */
```

## Font Weights
```css
--font-weight-thin: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

## Line Heights & Spacing
```css
--line-height-tight: 1.2;    /* Headings */
--line-height-normal: 1.5;   /* Body text */
--line-height-relaxed: 1.75; /* Large text blocks */

--letter-spacing-tight: -0.025em; /* Large headings */
--letter-spacing-normal: 0;       /* Body text */
--letter-spacing-wide: 0.025em;   /* Small text, buttons */
```

## Hierarchy Application

### H1 - Hero Name/Title
- Weight: Bold (700)
- Size: 3.5rem desktop / 2.5rem mobile
- Line height: Tight (1.2)
- Letter spacing: Tight (-0.025em)
- Color: --text-primary
- Usage: "Martin McCurley"

### H2 - Section Headings
- Weight: SemiBold (600)
- Size: 2.5rem desktop / 2rem mobile
- Line height: Tight (1.2)
- Color: --text-primary
- Usage: "Projects", "About", "Contact"

### H3 - Project Titles
- Weight: Medium (500)
- Size: 1.75rem desktop / 1.5rem mobile
- Line height: Tight (1.2)
- Color: --text-primary
- Usage: Individual project names

### Body Text
- Weight: Normal (400)
- Size: 1.125rem desktop / 1rem mobile
- Line height: Normal (1.5)
- Color: --text-primary
- Usage: Descriptions, bio text

### Small Text
- Weight: Normal (400)
- Size: 0.875rem
- Line height: Normal (1.5)
- Color: --text-secondary
- Usage: Tech tags, dates, metadata

## Design Principles
- **Minimalism**: Single font family reduces complexity
- **Hierarchy**: Clear size/weight distinctions guide user attention
- **Readability**: Generous line heights and appropriate contrast
- **Performance**: System font fallbacks for faster loading
- **Accessibility**: Minimum 16px body text for mobile readability 