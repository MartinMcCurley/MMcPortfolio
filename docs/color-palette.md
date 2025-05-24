# Color Palette - Martin McCurley Portfolio

## Primary Dark Theme
Updated to use a black/dark gray foundation with vibrant orange highlights for a modern, sleek aesthetic.

### Base Colors (Black & Gray Foundation)
```css
--background-primary: #0d0d0d;      /* Jet Black - Background / Base layer */
--background-secondary: #1a1a1a;    /* Charcoal Gray - Main hex surfaces */
--background-tertiary: #2e2e2e;     /* Slate Gray - Edge shadows / variation */
--background-quaternary: #3f3f3f;   /* Steel Gray - Layer separation / contrast */
```

### Text Colors
```css
--text-primary: #ffffff;            /* Pure white for main text on dark backgrounds */
--text-secondary: #e0e0e0;          /* Light gray for secondary text */
--text-muted: #a0a0a0;              /* Medium gray for captions/metadata */
```

### Accent Colors (Orange Highlights)
```css
--accent-primary: #ff5c00;          /* Neon Orange - Highlight edges / accents */
--accent-secondary: #ff7300;        /* Lighter orange for secondary highlights */
--accent-hover: #ff8533;            /* Even lighter orange for hover states */
```

### Utility Colors
```css
--border-subtle: #2e2e2e;           /* Slate Gray for subtle borders */
--border-accent: #ff5c00;           /* Orange for highlighted borders */
--shadow-light: rgba(255, 92, 0, 0.1);   /* Subtle orange glow */
--shadow-dark: rgba(0, 0, 0, 0.5);       /* Dark shadows */
```

## Color Reference Table

| Color Name        | Hex       | RGB          | Usage                       |
| ----------------- | --------- | ------------ | --------------------------- |
| **Jet Black**     | `#0d0d0d` | (13, 13, 13) | Background / Base layer     |
| **Charcoal Gray** | `#1a1a1a` | (26, 26, 26) | Main hex surfaces           |
| **Slate Gray**    | `#2e2e2e` | (46, 46, 46) | Edge shadows / variation    |
| **Steel Gray**    | `#3f3f3f` | (63, 63, 63) | Layer separation / contrast |
| **Neon Orange**   | `#ff5c00` | (255, 92, 0) | Highlight edges / accents   |

## Design Principles
- **High Contrast**: Pure white text on jet black ensures maximum readability
- **Layered Depth**: Multiple gray tones create visual hierarchy and depth
- **Strategic Orange**: Orange used sparingly for maximum impact on CTAs and interactive elements
- **Professional Feel**: Black/gray foundation conveys sophistication and modernity
- **Performance**: Minimal color palette reduces CSS complexity 

## Accessibility Notes
- **WCAG AA Compliance**: White text on black background provides excellent contrast (21:1 ratio)
- **Orange Accessibility**: Orange accent tested to ensure sufficient contrast on dark backgrounds
- **Focus States**: Orange provides clear visual feedback for keyboard navigation

## Optional Light Theme (Future)
For potential light mode toggle:

### Base Colors (Light)
```css
--background-primary-light: #FFFFFF;
--background-secondary-light: #F8F9FA;
--background-tertiary-light: #F1F3F4;
```

### Text Colors (Light)
```css
--text-primary-light: #1A1A1A;
--text-secondary-light: #4A4A4A;
--text-muted-light: #6B7280;
``` 