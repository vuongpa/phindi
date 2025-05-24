# Phindi Theme System

This document outlines the color system and theming approach for the Phindi application.

## Color Philosophy

The Phindi theme system is built around a chat-inspired design with two main themes:
- **Light Theme**: Clean, minimal design with subtle grays and high contrast
- **Dark Theme**: Modern dark interface with warm undertones for comfortable viewing

## Core Color Variables

### Light Theme
```css
--background: 0 0% 98%;           /* Very light gray for comfort */
--foreground: 240 10% 3.9%;       /* Dark text */
--card: 0 0% 100%;                /* Pure white cards */
--primary: 221 83% 53%;           /* Chat blue (consistent across themes) */
--secondary: 240 6% 94%;          /* Light gray for secondary elements */
--muted: 240 6% 94%;              /* Muted background */
--border: 240 5.9% 88%;           /* Subtle borders */
```

### Dark Theme
```css
--background: 216 12% 8%;         /* Deep dark background */
--foreground: 0 0% 95%;           /* Light text */
--card: 216 12% 12%;              /* Dark cards with subtle warmth */
--primary: 221 83% 53%;           /* Chat blue (consistent across themes) */
--secondary: 216 12% 16%;         /* Darker secondary background */
--muted: 216 12% 12%;             /* Muted dark background */
--border: 216 12% 18%;            /* Subtle dark borders */
```

## Design Principles

1. **Consistency**: Primary blue color remains consistent across both themes
2. **Comfort**: Dark theme uses warm undertones to reduce eye strain
3. **Contrast**: High contrast ratios for accessibility
4. **Semantic Colors**: Each color variable has a specific purpose and meaning

## Usage Guidelines

### Theme Variables
Always use CSS custom properties for colors:
```css
/* Good */
background-color: hsl(var(--background));
color: hsl(var(--foreground));

/* Avoid */
background-color: #ffffff;
color: #000000;
```

### Component Theming
Components should use semantic color tokens:
```tsx
<div className="bg-background text-foreground border border-border">
  <div className="bg-card text-card-foreground">
    <Button className="bg-primary text-primary-foreground">
      Click me
    </Button>
  </div>
</div>
```

### Theme Switching
Use the ThemeToggle component for consistent theme switching:
```tsx
import { ThemeToggle } from "@/components/theme-toggle"

// Icon variant for compact spaces
<ThemeToggle variant="icon" size="sm" />

// Full variant for settings pages
<ThemeToggle variant="full" />
```

### Keyboard Shortcuts
- **Ctrl/Cmd + Shift + T**: Quick theme toggle between light and dark modes

## Color Accessibility

- Light theme: WCAG AA compliant contrast ratios
- Dark theme: Optimized for extended viewing
- Focus states: High contrast ring using --ring color
- Interactive states: Consistent hover/active feedback

## Implementation Notes

1. All transitions use `transition-colors duration-300` for smooth theme changes
2. Meta theme-color is updated dynamically for mobile browsers
3. System preference detection is supported via "system" theme option
4. Local storage persistence for user preference

## File Structure

```
components/
  theme-provider.tsx    # Main theme context and logic
  theme-toggle.tsx      # Reusable theme toggle component
app/
  globals.css          # CSS custom properties and theme definitions
  layout.tsx           # Theme provider setup
```

## Best Practices

1. **Test both themes**: Always verify components work in both light and dark modes
2. **Use semantic tokens**: Don't hardcode color values
3. **Respect user preference**: Support system preference detection
4. **Smooth transitions**: Apply transitions to theme-dependent properties
5. **Accessibility first**: Maintain proper contrast ratios

## Troubleshooting

Common issues and solutions:

1. **Colors not updating**: Ensure component uses CSS custom properties
2. **Flash of unstyled content**: Use `suppressHydrationWarning` on html element
3. **Inconsistent borders**: Use `--border` variable instead of hardcoded values
4. **Poor contrast**: Test with accessibility tools and adjust if needed
