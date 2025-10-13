# Centralized Color System

A comprehensive, scalable color system that serves as the single source of truth for all colors in the application.

## 🎯 Overview

This color system eliminates hardcoded colors throughout the codebase and provides:
- **Single source of truth** for all color definitions
- **Tailwind CSS integration** with semantic naming
- **CSS custom properties** for dynamic theming
- **Type-safe** color tokens with TypeScript
- **Gradient system** for consistent visual effects

## 📁 Structure

```
src/lib/colors/
├── color-system.ts      # Base color definitions
├── gradients.ts         # Gradient configurations
├── tailwind-config.ts   # Tailwind extensions
├── index.ts            # Unified exports
└── README.md           # This file
```

## 🎨 Color Palette

### Primary Colors (Green/Blue Tones)
- **Ocean Green**: `#00BFA6` - Main brand color
- **Bright Green**: `#00D4B8` - Hover states
- **Deep Green**: `#009E8A` - Active states

### Secondary Colors (Purple Tones)
- **Electric Purple**: `#7C3AED` - Accent color
- **Neon Purple**: `#8B5CF6` - Secondary hover
- **Royal Purple**: `#6D28D9` - Secondary active

### Background Colors (Dark Tones)
- **Deep Night**: `#0D1117` - Main background
- **Night Sky**: `#161B22` - Secondary background
- **Card Night**: `#1A1F29` - Card background
- **Elevated Night**: `#212835` - Elevated elements

### Text Colors (Gray Tones)
- **Light Cloud**: `#C9D1D9` - Primary text
- **Soft Cloud**: `#8B949E` - Secondary text
- **Night Mist**: `#6E7681` - Tertiary text
- **Ink Night**: `#0D1117` - Dark text on light backgrounds

### Border Colors
- **Dark Line**: `#30363D` - Default borders
- **Green Line**: `#00BFA6` - Primary borders
- **Purple Line**: `#7C3AED` - Secondary borders

## 📖 Usage Examples

### In React Components

```tsx
import { colors, gradients, quickColors } from '@/src/lib/colors'

// Using base colors
const buttonStyle = {
  backgroundColor: colors.primary[500],
  color: colors.text.light,
}

// Using gradients
const headerStyle = {
  background: gradients.aurora,
}

// Using quick access colors
const linkColor = quickColors.primary
```

### With Tailwind CSS

```tsx
// Using semantic color tokens
<div className="bg-[var(--color-bg-deep)] text-[var(--color-text-light)]">
  <h1 className="text-[var(--color-primary-500)]">Title</h1>
  <p className="text-[var(--color-text-soft)]">Description</p>
</div>

// Using Tailwind utilities (defined in @theme inline)
<button className="bg-primary-500 text-white hover:bg-primary-400">
  Click Me
</button>
```

### Dynamic Theme Switching

```tsx
import { setThemeColors } from '@/src/lib/colors'

// Switch to different theme
useEffect(() => {
  setThemeColors('neon') // 'default' | 'dark' | 'neon'
}, [])
```

## 🎭 Gradients

### Available Gradients

- **Aurora Green**: `linear-gradient(90deg, #00BFA6, #00D4B8)`
- **Purple Twilight**: `linear-gradient(90deg, #7C3AED, #8B5CF6)`
- **Vibrant Duo**: `linear-gradient(90deg, #00BFA6, #7C3AED)`
- **Luminous Card**: `linear-gradient(90deg, rgba(0,191,166,0.1), rgba(124,58,237,0.1))`

### Usage

```tsx
// Direct CSS
<div style={{ background: gradients.aurora }}>Content</div>

// With Tailwind arbitrary values
<div className="bg-[var(--gradient-aurora)]">Content</div>
```

## 🔧 CSS Variables

All colors are available as CSS custom properties:

```css
/* Primary Colors */
--color-primary-400: #00D4B8
--color-primary-500: #00BFA6
--color-primary-600: #009E8A

/* Secondary Colors */
--color-secondary-400: #8B5CF6
--color-secondary-500: #7C3AED
--color-secondary-600: #6D28D9

/* Backgrounds */
--color-bg-deep: #0D1117
--color-bg-night: #161B22
--color-bg-card: #1A1F29
--color-bg-elevated: #212835

/* Text */
--color-text-light: #C9D1D9
--color-text-soft: #8B949E
--color-text-dim: #6E7681
--color-text-dark: #0D1117

/* Borders */
--color-border-dark: #30363D
--color-border-green: #00BFA6
--color-border-purple: #7C3AED

/* Gradients */
--gradient-aurora: linear-gradient(90deg, #00BFA6, #00D4B8)
--gradient-twilight: linear-gradient(90deg, #7C3AED, #8B5CF6)
--gradient-duo: linear-gradient(90deg, #00BFA6, #7C3AED)
```

## ✨ Semantic Color Usage

Use semantic naming in components for better maintainability:

```tsx
import { semanticColors } from '@/src/lib/colors'

// Action colors
<button style={{ backgroundColor: semanticColors.action.primary }}>
  Primary Action
</button>

// Status colors
<div style={{ color: semanticColors.status.success }}>
  Success message
</div>

// Interactive states
<a style={{ color: semanticColors.interactive.hover }}>
  Hover Link
</a>
```

## 🎨 Tailwind Integration

The color system is integrated into Tailwind through CSS custom properties defined in `globals.css`. All color classes use the centralized tokens:

```tsx
// Primary colors
<div className="bg-primary-500 text-primary-foreground">

// Semantic colors
<div className="bg-[var(--color-bg-card)] border-[var(--color-border-dark)]">

// Text colors
<p className="text-[var(--color-text-soft)]">
```

## 🔄 Migration Guide

### Before (Hardcoded Colors)
```tsx
<div className="bg-[#0D1117] text-[#c9d1d9] border-[#30363d]">
  <h1 className="text-[#00BFA6]">Title</h1>
</div>
```

### After (Centralized Colors)
```tsx
<div className="bg-[var(--color-bg-deep)] text-[var(--color-text-light)] border-[var(--color-border-dark)]">
  <h1 className="text-[var(--color-primary-500)]">Title</h1>
</div>
```

## 🎯 Benefits

1. **Consistency**: All colors defined in one place
2. **Maintainability**: Update colors globally by changing one value
3. **Theme Support**: Easy theme switching with `setThemeColors()`
4. **Type Safety**: TypeScript types for all color tokens
5. **Scalability**: Easy to add new colors without touching components
6. **Performance**: No runtime color calculations
7. **Developer Experience**: Semantic naming improves code readability

## 📝 Adding New Colors

1. Add color to `color-system.ts`:
```ts
export const colors = {
  // ...existing colors
  accent: {
    500: "#FF5733",
  }
}
```

2. Add CSS variable in `globals.css`:
```css
:root {
  --color-accent-500: #FF5733;
}
```

3. Use in components:
```tsx
<div className="text-[var(--color-accent-500)]">
```

## 🚀 Best Practices

1. **Always use CSS variables** in components (`var(--color-*)`)
2. **Use semantic names** instead of color values
3. **Avoid inline styles** with hardcoded colors
4. **Use gradients** from the gradient system
5. **Test theme switching** to ensure colors update properly
6. **Document custom colors** in this README

## 🐛 Troubleshooting

### Colors not updating
- Check that CSS variables are defined in `globals.css`
- Verify the color exists in `color-system.ts`
- Clear Next.js cache: `rm -rf .next`

### Theme switching not working
- Ensure `setThemeColors()` is called after DOM is ready
- Check browser console for errors
- Verify CSS custom properties are being set

## 📚 Additional Resources

- [Tailwind CSS Custom Colors](https://tailwindcss.com/docs/customizing-colors)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Color Theory for Developers](https://www.smashingmagazine.com/2016/04/web-developer-guide-color/)
