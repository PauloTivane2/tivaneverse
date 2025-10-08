# MatrixRain Component

A full-screen Matrix-style falling characters animation component for React/Next.js applications.

## Features

- ✨ Full-screen viewport coverage
- 🎯 Smooth, performant Canvas-based animation
- 🌈 Multiple color themes (green, blue, red, purple, cyan)
- ⚡ Customizable speed, density, and opacity
- 🔥 Glowing effects with motion blur simulation
- 📱 Automatic window resize adaptation
- 🎭 Random character variations and flickering
- 🌊 Subtle horizontal sway animation
- 🎨 Depth simulation with fading trails

## Usage

### Basic Usage

```tsx
import MatrixRain from "@/components/MatrixRain/MatrixRain"

export default function MyPage() {
  return (
    <div>
      <MatrixRain />
      <div className="relative z-10">
        {/* Your content here */}
      </div>
    </div>
  )
}
```

### Advanced Usage with Props

```tsx
import MatrixRain from "@/components/MatrixRain/MatrixRain"

export default function MyPage() {
  return (
    <div>
      <MatrixRain 
        color="blue"
        opacity={0.4}
        speed={1.5}
        density="high"
        glow={true}
        characters="01@#$%ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      />
      <div className="relative z-10">
        {/* Your content here */}
      </div>
    </div>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `"green" \| "blue" \| "red" \| "purple" \| "cyan"` | `"green"` | Color theme for the matrix rain |
| `opacity` | `number` | `0.6` | Opacity of the animation overlay (0-1) |
| `speed` | `number` | `1` | Speed multiplier for falling animation |
| `density` | `"low" \| "medium" \| "high"` | `"medium"` | Density of falling characters |
| `glow` | `boolean` | `true` | Whether to include glow effects |
| `characters` | `string` | Mixed set | Custom character set to use |

## Examples

### IT/Hacker Theme
```tsx
<MatrixRain 
  color="green"
  characters="01@#$%&*(){}[]<>/\\"
  density="high"
  speed={2}
/>
```

### Cyberpunk Theme
```tsx
<MatrixRain 
  color="cyan"
  opacity={0.8}
  speed={0.8}
  density="medium"
/>
```

### Minimal Code Rain
```tsx
<MatrixRain 
  color="blue"
  characters="01"
  opacity={0.3}
  density="low"
  glow={false}
/>
```

## Performance Notes

- Uses Canvas API for optimal performance
- Automatically handles window resize events
- Includes cleanup on component unmount
- Optimized for 60fps animation
- Memory efficient with object pooling

## Styling Notes

- Component uses `position: fixed` and covers full viewport
- Uses `pointer-events: none` so it doesn't interfere with UI
- Default z-index is 0 (background layer)
- Content should use `position: relative` with higher z-index

## Browser Support

- Modern browsers with Canvas API support
- Tested on Chrome, Firefox, Safari, Edge
- Mobile responsive and touch-friendly
