# Once UI Integration Guide

## 🎉 Successfully Integrated!

Your Next.js portfolio now has a complete Once UI design system. Here's what has been set up and how to use it.

## What's Included

### ✅ Core Setup
- **Design Tokens**: Complete SCSS variable system with CSS custom properties
- **Components**: Button, Card, Input components with variants and sizes
- **Dark Mode**: Automatic dark mode support
- **Animations**: Framer Motion integration for smooth interactions
- **TypeScript**: Full type safety and IntelliSense support

### ✅ File Structure
```
src/
├── components/once/          # React components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── index.ts
├── lib/once/                 # Utilities and types
│   ├── types.ts
│   ├── utils.ts
│   └── index.ts
└── styles/once/              # SCSS design system
    ├── globals.scss
    └── components/
        ├── _button.scss
        ├── _card.scss
        └── _input.scss
```

## Quick Start

### 1. View the Demo
Visit `/once-ui-demo` to see all components in action:
```
http://localhost:3006/once-ui-demo
```

### 2. Import Components
```tsx
import { Button, Card, CardHeader, CardTitle, Input } from '@/src/components/once';
```

### 3. Use in Your Components
```tsx
// Button examples
<Button variant="primary" size="md">Click me</Button>
<Button variant="outline" size="lg">Learn More</Button>

// Card example
<Card variant="elevated" padding="lg">
  <CardHeader>
    <CardTitle>My Project</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Project description here...</p>
  </CardContent>
</Card>

// Input example
<InputGroup>
  <Label>Email</Label>
  <Input type="email" placeholder="your@email.com" />
</InputGroup>
```

## Customization

### Brand Colors
Edit `once.config.ts` to customize your brand:
```tsx
brand: {
  primary: "#your-color",    // Currently: #5319e7
  secondary: "#your-color",  // Currently: #e7195a
  accent: "#your-color",     // Currently: #19e7a3
}
```

### Dark Mode
Add `class="dark"` to any parent element:
```tsx
<div className="dark">
  {/* All components inside will use dark mode */}
</div>
```

## Component Reference

### Button
```tsx
<Button 
  variant="primary" | "secondary" | "outline" | "ghost"
  size="sm" | "md" | "lg"
  disabled={boolean}
>
  Button Text
</Button>
```

### Card
```tsx
<Card variant="default" | "elevated" | "outlined" padding="sm" | "md" | "lg">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>Footer content</CardFooter>
</Card>
```

### Input
```tsx
<InputGroup>
  <Label htmlFor="input-id">Label</Label>
  <Input 
    id="input-id"
    size="sm" | "md" | "lg"
    error={boolean}
    disabled={boolean}
    placeholder="Placeholder text"
  />
  <HelperText>Helper text</HelperText>
  <ErrorMessage>Error message</ErrorMessage>
</InputGroup>
```

## Next Steps

### Phase 2: Start Replacing Components
1. **Choose a page/component** to update (e.g., contact form, project cards)
2. **Replace existing elements** with Once UI components
3. **Customize styling** using the design tokens
4. **Test thoroughly** across different screen sizes

### Recommended Integration Order
1. **Buttons** - Replace all buttons with `<Button>` components
2. **Cards** - Convert project cards and content blocks to `<Card>` components  
3. **Forms** - Update contact forms and any inputs with `<Input>` components
4. **Custom Components** - Build new components using the design tokens

### Adding More Components
Follow the existing pattern in `src/components/once/` to add:
- Navigation components
- Modal/Dialog components  
- Badge/Tag components
- Loading/Skeleton components

## Design Tokens Reference

All design tokens are available as CSS custom properties:

```css
/* Colors */
var(--once-brand-primary)
var(--once-brand-secondary) 
var(--once-neutral-100)

/* Spacing */
var(--once-space-xs)   /* 0.25rem */
var(--once-space-sm)   /* 0.5rem */
var(--once-space-md)   /* 1rem */

/* Border Radius */
var(--once-radius-sm)  /* 0.25rem */
var(--once-radius-md)  /* 0.5rem */

/* Shadows */
var(--once-shadow-sm)
var(--once-shadow-md)
```

## Troubleshooting

### Common Issues
1. **Import errors**: Make sure you're importing from `@/src/components/once`
2. **Styles not loading**: Ensure `globals.scss` is imported in `layout.tsx`
3. **TypeScript errors**: Check that all Once UI types are properly exported

### Getting Help
- Check the demo page at `/once-ui-demo`
- Review the component source code in `src/components/once/`
- Refer to the original Once UI documentation at [once-ui.com](https://once-ui.com)

---

**🎨 Happy designing with Once UI!** Your portfolio now has a professional, maintainable design system ready for production. 