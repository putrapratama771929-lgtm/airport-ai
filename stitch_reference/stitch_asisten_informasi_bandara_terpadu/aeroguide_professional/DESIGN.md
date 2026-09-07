---
name: AeroGuide Professional
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#43474f'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#737780'
  outline-variant: '#c3c6d1'
  surface-tint: '#3a5f94'
  primary: '#001e40'
  on-primary: '#ffffff'
  primary-container: '#003366'
  on-primary-container: '#799dd6'
  inverse-primary: '#a7c8ff'
  secondary: '#5c5f61'
  on-secondary: '#ffffff'
  secondary-container: '#e0e3e5'
  on-secondary-container: '#626567'
  tertiary: '#0e1f32'
  on-tertiary: '#ffffff'
  tertiary-container: '#243448'
  on-tertiary-container: '#8c9cb5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a7c8ff'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#1f477b'
  secondary-fixed: '#e0e3e5'
  secondary-fixed-dim: '#c4c7c9'
  on-secondary-fixed: '#191c1e'
  on-secondary-fixed-variant: '#444749'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  headline-lg:
    fontFamily: Work Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Work Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Work Sans
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Work Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is engineered for high-utility airport environments where clarity and authority are paramount. The brand personality is professional, calm, and hyper-efficient, designed to alleviate the inherent stress of travel. 

The aesthetic follows a **Corporate / Modern** approach with a focus on high legibility and systematic organization. It leverages a "utility-first" philosophy, prioritizing rapid information retrieval over decorative elements. The interface uses generous whitespace and a structured grid to guide the user through complex logistical data, such as flight timings and terminal directions, with the steady hand of a seasoned concierge.

## Colors

The palette is anchored by a deep "Airport Blue" (Primary), evoking a sense of institutional trust and global standards. 

- **Primary (#003366):** Used for headers, primary action buttons, and critical status indicators.
- **Secondary (#F8FAFC):** A clean "Ice White" used for background surfaces and chat containers to maintain a fresh, airy feel.
- **Tertiary (#64748B):** A soft slate gray utilized for secondary metadata, labels, and borders.
- **Neutral (#1E293B):** A dark navy used exclusively for high-contrast typography and iconography to ensure maximum readability under various lighting conditions.

Functional colors should be used sparingly: Green (#10B981) for "On Time" status and Amber (#F59E0B) for "Delayed" alerts.

## Typography

This design system utilizes **Work Sans** for headings to provide a grounded, professional structure that feels reliable. **Inter** is selected for body text and labels due to its exceptional legibility in digital interfaces and its neutral, systematic character.

Maintain a strict vertical rhythm. Headline-LG is reserved for main screen titles (like "Flight Schedule"), while Label-SM is used for flight numbers and gate codes to ensure they stand out as distinct data points. On mobile devices, headline sizes scale down slightly to prevent awkward text wrapping in narrow chat windows.

## Layout & Spacing

The layout employs a **Fluid Grid** model with a base-4 unit system. For the chatbot interface, the primary content column is centered on desktop with a maximum width of 800px to maintain focus, while expanding to 100% width on mobile devices.

- **Chat Bubbles:** Should have a maximum width of 75% of the container.
- **Sidebars:** If used for flight tracking lists, they should occupy a fixed 320px width on desktop.
- **Margins:** 16px safe-area margins for mobile; 40px for desktop to emphasize the professional, spacious feel.
- **Reflow:** On mobile, the flight status trackers transition from a multi-column row to a vertical stacked card.

## Elevation & Depth

Hierarchy is established using **Tonal Layers** supplemented by very subtle, high-diffusion shadows. 

1. **Floor:** The main background uses the Secondary color (#F8FAFC).
2. **Cards & Bubbles:** UI elements sit on the "Surface" level, which is pure white (#FFFFFF). 
3. **Shadows:** Use a single, soft shadow style for "active" or "floating" elements: `0px 4px 12px rgba(0, 51, 102, 0.08)`. This tinting with the Primary color keeps the shadow from looking "dirty" and integrates it with the brand.
4. **Interactive States:** Hovering over a quick-action button should slightly increase the shadow's spread to signify lift.

## Shapes

The design system utilizes **Soft** geometry (0.25rem - 0.75rem) to strike a balance between professional precision and modern approachability.

- **Standard Elements (Inputs, Small Buttons):** 4px (0.25rem) radius.
- **Containers (Cards, Chat Bubbles):** 8px (0.5rem) radius for a more substantial, modern look.
- **Status Indicators:** Flight status tags (like "Delayed") should use a 12px (0.75rem) radius to differentiate them from functional buttons.
- **Images:** Avoid circular avatars; use the standard 8px radius for user/bot icons.

## Components

### Chat Bubbles
- **Bot Bubbles:** Background: White; Border: 1px Solid Secondary; Text: Neutral.
- **User Bubbles:** Background: Primary; Text: White. No shadows are used for bubbles to maintain a clean, flat aesthetic.

### Info Cards & Flight Trackers
- Cards feature a 1px border (#E2E8F0) and a subtle shadow on hover.
- Flight numbers are set in `label-sm` (uppercase) for quick identification.
- Use a high-contrast divider for "Departure" vs "Arrival" data within the card.

### Quick-Action Buttons
- Displayed as a horizontal scrolling row of "Chips".
- Style: Transparent background, Primary color border, `label-md` typography.
- On hover/tap: Fill with Primary color and change text to White.

### Input Fields
- The chat input should be persistent at the bottom, using a 1px border. 
- Focus state: Border color changes to Primary with a 2px outer glow in 10% Primary color.

### Status Trackers
- Linear progress bars for flight duration, using Primary for progress and a light gray for the track.
- Iconography: Use thin-stroke, geometric icons for "Gate," "Baggage," and "Terminal."