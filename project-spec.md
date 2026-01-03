# Herb's House Partner Portal

## Project Specification v1.0

---

## 1. Overview

### 1.1 Purpose
A resource library portal for Herb's House Coffee wholesale partners with existing co-marketing engagements. The portal centralizes marketing assets, sales collateral, and project dashboards in a clean, utilitarian interface.

### 1.2 Scope
- Single-page React application
- Passcode-protected access (shared company password)
- Three resource sections: Marketing, Sales, Projects
- Static hosting on GitHub Pages

### 1.3 Design Philosophy
- **Clean and utilitarian** — prioritize function over decoration
- **Dashboard-style UI** — familiar patterns from modern web apps
- **Light backgrounds** — professional, easy on the eyes
- **Minimal complexity** — static implementation, no backend dependencies
- **Polished execution** — despite simplicity, maintain visual refinement through consistent spacing, well-balanced typography, and thoughtful use of color; the interface should feel professional and pleasant, not sterile or generic
- **Mobile-first design** — the mobile experience is the primary design target, not an afterthought; mobile layouts should feel intentionally crafted for touch and small screens, with desktop as an enhancement

---

## 2. Authentication

### 2.1 Requirements
| Requirement | Specification |
|-------------|---------------|
| Auth Type | Single shared passcode |
| User Profiles | None |
| Session Duration | 24 hours |
| Storage Method | `localStorage` with timestamp |

### 2.2 Implementation Details

**Login Flow:**
1. User visits portal → sees login screen
2. User enters company passcode
3. If correct → store auth token + timestamp in `localStorage`
4. Redirect to main portal view

**Session Validation:**
1. On page load, check `localStorage` for auth token
2. Compare stored timestamp against current time
3. If token exists AND less than 24 hours old → allow access
4. Otherwise → redirect to login screen

**Logout:**
- Provide manual logout button in header
- Clears `localStorage` auth data

### 2.3 Login Screen UI
- Centered card on neutral background
- Herb's House logo at top
- Single password input field (masked)
- "Enter Portal" button
- Error state for incorrect passcode

---

## 3. Information Architecture

### 3.1 Site Structure

```
Partner Portal (SPA)
├── Login Screen
└── Main Portal
    ├── Header (logo, nav, logout)
    ├── Section Navigation (Marketing | Sales | Projects)
    └── Resource Grid
        └── Resource Cards (5-10 per section)
```

### 3.2 Sections & Content

#### Marketing (5-10 resources)
| Resource Type | Examples |
|---------------|----------|
| Brand Assets | Logos, color palettes, brand guidelines |
| Co-branded Templates | Partner marketing templates |
| Social Media Kits | Instagram, Facebook assets |
| Brewing Guide | PDF downloadable guide |
| Grower Series Release Calendar | Seasonal release schedule |
| Coffee Release Overviews | New product launch materials |

#### Sales (5-10 resources)
| Resource Type | Examples |
|---------------|----------|
| Product Info Sheets | Individual coffee product details |
| Pricing Guides | Wholesale pricing documentation |
| Sell Sheets | One-pagers for sales conversations |

#### Projects (2-5 resources)
| Resource Type | Examples |
|---------------|----------|
| Retail Rollout Dashboard | External link to project tracker |
| Demo Activation Dashboard | External link to activation tracker |

---

## 4. UI Components

### 4.1 Component Inventory

| Component | Description |
|-----------|-------------|
| `App` | Root component, manages auth state and routing |
| `LoginScreen` | Passcode entry interface |
| `Portal` | Main authenticated view container |
| `Header` | Logo, section nav, logout button |
| `SectionNav` | Tab navigation for Marketing/Sales/Projects |
| `ResourceGrid` | CSS Grid container for resource cards |
| `ResourceCard` | Individual resource display component |

### 4.2 ResourceCard Specification

**Data Model:**
```javascript
{
  id: string,
  title: string,
  description: string,
  dateUpdated: string,        // ISO date string
  previewImage: string,       // URL or path to image
  fileType: string,           // "pdf" | "png" | "jpg" | "link" | "zip"
  url: string,                // Download URL or external link
  isExternal: boolean         // true = opens in new tab
}
```

**Card Layout:**
```
┌─────────────────────────────────┐
│                                 │
│      [Preview Image]            │
│                                 │
├─────────────────────────────────┤
│ [FileType Icon]  [External ↗]   │
│                                 │
│ Title                           │
│ Description text that may       │
│ wrap to two lines max...        │
│                                 │
│ Updated: Jan 2, 2026            │
└─────────────────────────────────┘
```

**Visual States:**
- Default: Subtle border, light background
- Hover: Elevated shadow, slight scale (1.02)
- Active/Click: Brief press feedback

### 4.3 File Type Indicators

| File Type | Icon | Color |
|-----------|------|-------|
| PDF | Document icon | Red accent |
| PNG/JPG | Image icon | Blue accent |
| ZIP | Archive icon | Yellow accent |
| External Link | Arrow-up-right | Gray |

---

## 5. Visual Design System

### 5.0 Design Quality Guidelines

While this portal prioritizes utility over creativity, execution quality matters. Apply these principles throughout:

- **Consistent rhythm** — Use the spacing scale religiously; alignment issues erode professionalism
- **Typographic hierarchy** — Clear distinction between headings, body, and metadata creates visual order
- **Balanced whitespace** — Generous padding inside cards and between sections; avoid cramped layouts
- **Subtle depth** — Light shadows and borders provide structure without heaviness
- **Color restraint** — Primary blue used sparingly for interactive elements; most UI remains neutral
- **Attention to detail** — Rounded corners, consistent icon sizing, aligned elements; small refinements compound into a polished feel

### 5.1 Color Palette

**Derived from herbshousecoffee.com:**

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | Herb's Blue | `#0057B7` | Buttons, active states, links |
| Primary Dark | Deep Blue | `#004494` | Hover states, emphasis |
| Background | Off-White | `#FAFAFA` | Page background |
| Surface | White | `#FFFFFF` | Cards, panels |
| Border | Light Gray | `#E5E7EB` | Card borders, dividers |
| Text Primary | Charcoal | `#1F2937` | Headings, body text |
| Text Secondary | Gray | `#6B7280` | Descriptions, metadata |
| Text Muted | Light Gray | `#9CA3AF` | Timestamps, hints |
| Success | Green | `#10B981` | Success states |
| Error | Red | `#EF4444` | Error messages |

### 5.2 Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Logo/Brand | System sans-serif | 700 | — |
| H1 (Page Title) | Inter or system | 600 | 24px |
| H2 (Section) | Inter or system | 600 | 18px |
| Card Title | Inter or system | 500 | 16px |
| Body Text | Inter or system | 400 | 14px |
| Metadata | Inter or system | 400 | 12px |

**Font Stack:**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### 5.3 Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 4px | Tight spacing, icon gaps |
| `sm` | 8px | Inline elements |
| `md` | 16px | Component padding |
| `lg` | 24px | Section spacing |
| `xl` | 32px | Page margins |
| `2xl` | 48px | Large section gaps |

### 5.4 Border Radius

| Element | Radius |
|---------|--------|
| Buttons | 6px |
| Cards | 8px |
| Inputs | 6px |
| Modal/Large panels | 12px |

### 5.5 Shadows

| Level | Value | Usage |
|-------|-------|-------|
| None | — | Default cards |
| Small | `0 1px 3px rgba(0,0,0,0.1)` | Hover states |
| Medium | `0 4px 12px rgba(0,0,0,0.1)` | Elevated cards |
| Large | `0 8px 24px rgba(0,0,0,0.12)` | Modals, dropdowns |

---

## 6. Layout Specifications

### 6.1 Page Layout

```
┌────────────────────────────────────────────────────────┐
│ HEADER                                                 │
│ [Logo]                    [Marketing] [Sales] [Projects] [Logout] │
├────────────────────────────────────────────────────────┤
│                                                        │
│  MAIN CONTENT AREA                                     │
│  max-width: 1200px, centered                           │
│                                                        │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐               │
│  │ Card │  │ Card │  │ Card │  │ Card │               │
│  └──────┘  └──────┘  └──────┘  └──────┘               │
│                                                        │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐               │
│  │ Card │  │ Card │  │ Card │  │ Card │               │
│  └──────┘  └──────┘  └──────┘  └──────┘               │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### 6.2 Mobile-First Responsive Design

**Design Approach:**
Start with mobile layout as the base, then enhance for larger screens. Mobile is NOT a scaled-down desktop — it's the primary experience.

**Breakpoints:**

| Breakpoint | Width | Grid Columns | Notes |
|------------|-------|--------------|-------|
| Mobile (base) | < 640px | 1 column | Primary design target |
| Tablet | 640px - 1024px | 2 columns | Enhanced layout |
| Desktop | > 1024px | 3-4 columns | Full experience |

**Mobile-Specific Design Requirements:**

| Element | Mobile Specification |
|---------|---------------------|
| Header | Compact height (56px), hamburger menu or simplified nav |
| Section Nav | Full-width horizontal tabs OR stacked vertical menu |
| Resource Cards | Full-width, optimized touch targets (min 44px tap areas) |
| Typography | Slightly larger body text (16px min) for readability |
| Spacing | Generous vertical rhythm, comfortable thumb-scroll spacing |
| Touch Targets | All interactive elements minimum 44x44px |
| Card Layout | Preview image on top, metadata below (vertical stack) |

**Mobile Navigation Pattern:**
```
┌─────────────────────────┐
│ [≡] Herb's Partner Portal │
├─────────────────────────┤
│ [Marketing] [Sales] [Projects] │  ← Horizontal scroll or pills
├─────────────────────────┤
│                         │
│ ┌─────────────────────┐ │
│ │    [Preview Image]  │ │
│ │                     │ │
│ │ PDF  Title          │ │
│ │ Description text    │ │
│ │ Updated: Jan 2      │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │    [Preview Image]  │ │
│ │         ...         │ │
│ └─────────────────────┘ │
│                         │
└─────────────────────────┘
```

**Tailwind Approach:**
```jsx
// ResourceGrid component using Tailwind classes
<div className="grid grid-cols-1 gap-md p-md sm:grid-cols-2 sm:gap-5 sm:p-5 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] lg:gap-lg lg:p-lg">
  {/* Resource cards */}
</div>
```

Or with standard Tailwind breakpoints:
```jsx
<div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-5 sm:p-5 lg:grid-cols-3 lg:gap-6 lg:p-6 xl:grid-cols-4">
  {/* Resource cards */}
</div>
```

### 6.3 Grid Specifications

Using Tailwind utility classes:
```jsx
// Desktop grid with auto-fill
className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-lg p-lg"

// Or using responsive breakpoints
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 p-4 sm:p-5 lg:p-6"
```

### 6.4 Header Specifications

Using Tailwind classes:
```jsx
<header className="h-16 bg-surface border-b border-border sticky top-0 z-50">
  <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
    {/* Logo: Left-aligned, max-height 40px */}
    <img src="/logo.png" alt="Herb's House" className="h-10" />

    {/* Navigation: Right-aligned, horizontal tabs */}
    <nav className="flex items-center gap-4">
      {/* Section tabs */}
    </nav>

    {/* Logout: Far right, text button or icon */}
    <button className="text-sm text-text-secondary hover:text-text-primary">
      Logout
    </button>
  </div>
</header>
```

---

## 7. Interaction Design

### 7.1 Navigation Behavior

| Action | Behavior |
|--------|----------|
| Click section tab | Filter resource grid to show only that section's resources |
| Active tab | Highlighted with primary color underline |
| URL state | Optional: Update hash (e.g., `#marketing`) for deep linking |

### 7.2 Resource Card Interactions

| Action | Behavior |
|--------|----------|
| Hover | Subtle shadow elevation, cursor pointer |
| Click (downloadable) | Trigger file download |
| Click (external link) | Open in new tab (`target="_blank"`) |
| External indicator | Show arrow icon on card |

### 7.3 Login Interactions

| Action | Behavior |
|--------|----------|
| Submit empty | Show "Please enter passcode" error |
| Submit incorrect | Show "Incorrect passcode" error, clear input |
| Submit correct | Store auth, transition to portal |
| Enter key | Submit form |

---

## 8. Technical Implementation

### 8.1 Technology Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 (single file or minimal structure) |
| Styling | Tailwind CSS |
| State | React `useState` / `useEffect` |
| Storage | `localStorage` for auth persistence |
| Build | Vite |
| Hosting | GitHub Pages |

### 8.2 File Structure

```
/apps/partner-portal/
├── project-spec.md          # This document
├── index.html               # Entry point
├── src/
│   ├── App.jsx              # Main application component
│   ├── components/
│   │   ├── LoginScreen.jsx
│   │   ├── Portal.jsx
│   │   ├── Header.jsx
│   │   ├── SectionNav.jsx
│   │   ├── ResourceGrid.jsx
│   │   └── ResourceCard.jsx
│   ├── data/
│   │   └── resources.js     # Static resource data
│   ├── index.css            # Tailwind directives and custom styles
│   └── utils/
│       └── auth.js          # Auth helper functions
├── public/
│   ├── assets/              # Preview images, downloadable files
│   └── logo.png             # Herb's House logo
├── scripts/
│   └── capture-screenshots.js  # Puppeteer validation script
├── screenshots/             # Captured validation screenshots
│   ├── mobile-login.png
│   ├── mobile-marketing.png
│   ├── tablet-login.png
│   ├── desktop-marketing.png
│   └── ...                  # All viewport/page combinations
├── tailwind.config.js       # Tailwind configuration with design tokens
├── postcss.config.js        # PostCSS configuration
├── package.json
└── README.md
```

### 8.3 Tailwind Configuration

The design system tokens from Section 5 should be implemented in `tailwind.config.js`:

```javascript
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'herbs-blue': '#0057B7',
        'herbs-blue-dark': '#004494',
        'surface': '#FFFFFF',
        'background': '#FAFAFA',
        'border': '#E5E7EB',
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
        'text-muted': '#9CA3AF',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
      },
      boxShadow: {
        'small': '0 1px 3px rgba(0,0,0,0.1)',
        'medium': '0 4px 12px rgba(0,0,0,0.1)',
        'large': '0 8px 24px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}
```

The main CSS file should include Tailwind directives:

```css
/* src/index.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom base styles */
@layer base {
  body {
    @apply bg-background text-text-primary font-sans;
  }
}

/* Custom component classes if needed */
@layer components {
  .card-hover {
    @apply transition-all duration-200 hover:shadow-medium hover:scale-[1.02];
  }
}
```

### 8.4 Resource Data Structure

```javascript
// src/data/resources.js

export const resources = [
  {
    id: "mkt-001",
    section: "marketing",
    title: "Brand Asset Kit",
    description: "Complete logo package with usage guidelines and color specs.",
    dateUpdated: "2026-01-02",
    previewImage: "/assets/previews/brand-kit.png",
    fileType: "zip",
    url: "/assets/downloads/brand-asset-kit.zip",
    isExternal: false
  },
  {
    id: "mkt-002",
    section: "marketing",
    title: "Brewing Guide",
    description: "Comprehensive guide to brewing Herb's House coffees.",
    dateUpdated: "2025-11-15",
    previewImage: "/assets/previews/brewing-guide.png",
    fileType: "pdf",
    url: "/assets/downloads/brewing-guide.pdf",
    isExternal: false
  },
  {
    id: "proj-001",
    section: "projects",
    title: "Retail Rollout Dashboard",
    description: "Track retail partner onboarding and activation status.",
    dateUpdated: "2026-01-02",
    previewImage: "/assets/previews/retail-dashboard.png",
    fileType: "link",
    url: "https://example.com/retail-dashboard",
    isExternal: true
  }
  // ... additional resources
];
```

### 8.5 Auth Implementation

```javascript
// src/utils/auth.js

const AUTH_KEY = "hhp_auth";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in ms

export const checkAuth = () => {
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return false;
  
  const { timestamp } = JSON.parse(stored);
  const elapsed = Date.now() - timestamp;
  
  if (elapsed > SESSION_DURATION) {
    localStorage.removeItem(AUTH_KEY);
    return false;
  }
  return true;
};

export const login = (passcode) => {
  // Compare against stored passcode (in production, use env variable)
  const VALID_PASSCODE = "PARTNER2026"; // Placeholder
  
  if (passcode === VALID_PASSCODE) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({
      authenticated: true,
      timestamp: Date.now()
    }));
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};
```

---

## 9. Placeholder Content

### 9.1 Marketing Resources (Sample)

| Title | Description | Type |
|-------|-------------|------|
| Brand Asset Kit | Complete logo package with usage guidelines | ZIP |
| Co-Branded Templates | Editable marketing templates for partners | ZIP |
| Social Media Kit | Instagram and Facebook ready graphics | ZIP |
| Brewing Guide | Comprehensive guide to brewing methods | PDF |
| Grower Series Calendar | 2026 release schedule for Grower Series | PDF |
| Coffee Release Overview | Current season product highlights | PDF |

### 9.2 Sales Resources (Sample)

| Title | Description | Type |
|-------|-------------|------|
| Product Info Sheets | Individual coffee product specifications | PDF |
| Wholesale Pricing Guide | Current wholesale pricing tiers | PDF |
| Sell Sheet - House Blend | One-pager for House Blend | PDF |
| Sell Sheet - Signature | One-pager for Signature Blend | PDF |

### 9.3 Projects (Sample)

| Title | Description | Type |
|-------|-------------|------|
| Retail Rollout Dashboard | Partner onboarding tracker | External Link |
| Demo Activation Dashboard | Event and demo tracking | External Link |

---

## 10. Validation Workflow

### 10.1 Continuous Visual Validation

**CRITICAL: The build engineer must validate every UI change with Puppeteer screenshots before proceeding to the next task.**

This is not optional. Do not batch UI changes — test each one individually.

**Validation Cycle:**
```
┌─────────────────────────────────────────────────────────┐
│  1. Make single UI change                               │
│              ↓                                          │
│  2. Run Puppeteer screenshot capture                    │
│              ↓                                          │
│  3. Analyze screenshot for:                             │
│     - Visual correctness                                │
│     - Layout issues                                     │
│     - Spacing/alignment problems                        │
│     - Mobile-first compliance                           │
│              ↓                                          │
│  4. If issues found → fix and re-capture                │
│     If acceptable → proceed to next change              │
│              ↓                                          │
│  5. Repeat for each todo item                           │
└─────────────────────────────────────────────────────────┘
```

### 10.2 Puppeteer Screenshot Configuration

**Required Viewport Captures:**

| Device | Width | Height | Priority |
|--------|-------|--------|----------|
| Mobile | 375px | 667px | **PRIMARY** — validate first |
| Tablet | 768px | 1024px | Secondary |
| Desktop | 1280px | 800px | Secondary |

**Capture Points:**
- Login screen (empty state)
- Login screen (error state)
- Portal — Marketing section
- Portal — Sales section
- Portal — Projects section
- Individual card hover states (desktop only)

### 10.3 Screenshot Analysis Checklist

After each Puppeteer capture, verify:

**Mobile (375px) — Primary:**
- [ ] Full-width cards with no horizontal overflow
- [ ] Touch targets meet 44px minimum
- [ ] Text is readable without zooming (16px+ body)
- [ ] Adequate spacing between tap targets
- [ ] Navigation is accessible and usable
- [ ] No content cut off or hidden
- [ ] Vertical rhythm feels intentional

**Tablet (768px):**
- [ ] Two-column grid displays correctly
- [ ] Cards are evenly sized
- [ ] Header scales appropriately
- [ ] No awkward whitespace gaps

**Desktop (1280px):**
- [ ] Multi-column grid fills space well
- [ ] Maximum content width respected
- [ ] Hover states visible and correct
- [ ] Professional, balanced appearance

### 10.4 Puppeteer Implementation

**Setup Script:**
```javascript
// scripts/capture-screenshots.js
const puppeteer = require('puppeteer');

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 }
];

const PAGES = [
  { name: 'login', path: '/', auth: false },
  { name: 'marketing', path: '/#marketing', auth: true },
  { name: 'sales', path: '/#sales', auth: true },
  { name: 'projects', path: '/#projects', auth: true }
];

async function captureScreenshots() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  for (const viewport of VIEWPORTS) {
    await page.setViewport({ 
      width: viewport.width, 
      height: viewport.height 
    });
    
    for (const pageConfig of PAGES) {
      // Handle auth if needed
      if (pageConfig.auth) {
        await page.evaluate(() => {
          localStorage.setItem('hhp_auth', JSON.stringify({
            authenticated: true,
            timestamp: Date.now()
          }));
        });
      }
      
      await page.goto(`http://localhost:5173${pageConfig.path}`);
      await page.waitForTimeout(500); // Allow render
      
      const filename = `screenshots/${viewport.name}-${pageConfig.name}.png`;
      await page.screenshot({ path: filename, fullPage: true });
      console.log(`Captured: ${filename}`);
    }
  }
  
  await browser.close();
}

captureScreenshots();
```

**NPM Script:**
```json
{
  "scripts": {
    "screenshot": "node scripts/capture-screenshots.js",
    "validate": "npm run dev & sleep 3 && npm run screenshot"
  }
}
```

### 10.5 When to Capture Screenshots

**Capture IMMEDIATELY after:**
- Any CSS/styling change
- Any layout modification
- Any component structure change
- Adding new UI elements
- Modifying spacing or typography
- Changing colors or visual properties
- Responsive breakpoint adjustments

**Do NOT wait until:**
- Multiple changes have accumulated
- A feature is "complete"
- End of development session

**Frequency guideline:** If in doubt, capture. Over-validating is better than discovering issues late.

### 10.6 Issue Resolution Protocol

When screenshot analysis reveals issues:

1. **Stop** — Do not proceed to next task
2. **Diagnose** — Identify root cause from screenshot
3. **Fix** — Make targeted correction
4. **Re-capture** — Run Puppeteer again
5. **Verify** — Confirm fix resolved issue
6. **Document** — Note what was wrong and how it was fixed
7. **Proceed** — Only then move to next task

---

## 11. Build & Deployment

### 11.1 Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 11.2 GitHub Pages Deployment

1. Build the project: `npm run build`
2. Output directory: `dist/`
3. Configure GitHub Pages to serve from `dist/` or use `gh-pages` branch
4. Add base URL configuration if not at root domain

### 11.3 Environment Configuration

```javascript
// For passcode - use environment variable in production
const PASSCODE = import.meta.env.VITE_PORTAL_PASSCODE || "PARTNER2026";
```

---

## 12. Acceptance Criteria

### 12.1 Authentication
- [ ] Login screen displays on first visit
- [ ] Correct passcode grants access to portal
- [ ] Incorrect passcode shows error message
- [ ] Session persists for 24 hours
- [ ] Logout button clears session and returns to login

### 12.2 Navigation
- [ ] Three section tabs visible: Marketing, Sales, Projects
- [ ] Clicking tab filters resources to that section
- [ ] Active tab is visually distinguished

### 12.3 Resource Display
- [ ] Resources display in responsive grid
- [ ] Each card shows: title, description, preview image, file type, date
- [ ] External links show indicator icon
- [ ] Downloadable resources trigger download on click
- [ ] External links open in new tab

### 12.4 Visual Design
- [ ] Uses Herb's House color palette (primary blue #0057B7)
- [ ] Clean, utilitarian dashboard aesthetic
- [ ] Light background with white cards
- [ ] Responsive on mobile, tablet, and desktop
- [ ] Consistent spacing and alignment throughout
- [ ] Clear typographic hierarchy
- [ ] Polished, professional appearance (not sterile or generic)

### 12.5 Technical
- [ ] Single-page React application
- [ ] No external API dependencies
- [ ] Deploys successfully to GitHub Pages
- [ ] All resources load correctly

### 12.6 Mobile-First Design
- [ ] Mobile layout is primary design (not scaled-down desktop)
- [ ] All touch targets minimum 44x44px
- [ ] Body text minimum 16px on mobile
- [ ] Full-width cards on mobile with no horizontal scroll
- [ ] Navigation is thumb-friendly
- [ ] Vertical rhythm feels intentional and spacious

### 12.7 Validation Process
- [ ] Puppeteer screenshot captured after each UI change
- [ ] Mobile viewport (375px) validated before tablet/desktop
- [ ] No UI changes batched without intermediate validation
- [ ] All screenshot issues resolved before proceeding
- [ ] Final screenshots captured for all viewports and pages

---

## 13. Future Considerations (Out of Scope)

These features are explicitly NOT included in v1.0 but noted for potential future iterations:

- User accounts and individual logins
- Role-based access control
- Search and filtering within sections
- Resource upload/management interface
- Analytics and download tracking
- Email notifications for new resources

---

## 14. Implementation Checklist

**Instructions for Build Engineer:** Complete each task in order. After every UI-related task, run Puppeteer validation before proceeding. Do not skip validation steps.

### Phase 1: Project Setup
- [ ] Initialize React project with Vite
- [ ] Install dependencies (React, Tailwind CSS, PostCSS, Autoprefixer, Puppeteer as dev dependency)
- [ ] Configure Tailwind CSS (tailwind.config.js and postcss.config.js)
- [ ] Create folder structure per Section 8.2
- [ ] Set up Puppeteer screenshot script
- [ ] **VALIDATE:** Capture baseline screenshot of empty app

### Phase 2: Design System
- [ ] Configure tailwind.config.js with design tokens (colors, spacing, typography, shadows)
- [ ] Create src/index.css with Tailwind directives
- [ ] Apply base styles via Tailwind (@layer base)
- [ ] **VALIDATE:** Capture screenshot — verify base styling on mobile

### Phase 3: Login Screen
- [ ] Build LoginScreen component structure
- [ ] **VALIDATE:** Capture screenshot — check mobile layout
- [ ] Style login card (centered, branded)
- [ ] **VALIDATE:** Capture screenshot — verify card appearance
- [ ] Add password input and button
- [ ] **VALIDATE:** Capture screenshot — verify touch target sizes
- [ ] Implement error state styling
- [ ] **VALIDATE:** Capture screenshot — verify error message display
- [ ] Connect auth logic
- [ ] **VALIDATE:** Test login flow, capture both states

### Phase 4: Portal Layout
- [ ] Build Portal container component
- [ ] **VALIDATE:** Capture screenshot — verify mobile container
- [ ] Build Header component (mobile-first)
- [ ] **VALIDATE:** Capture screenshot — verify header on 375px
- [ ] Add desktop header enhancements
- [ ] **VALIDATE:** Capture screenshot — verify header on 1280px
- [ ] Build SectionNav component (mobile-first)
- [ ] **VALIDATE:** Capture screenshot — verify nav touch targets

### Phase 5: Resource Grid
- [ ] Build ResourceGrid container (mobile-first: single column)
- [ ] **VALIDATE:** Capture screenshot — verify single column on mobile
- [ ] Add tablet breakpoint (2 columns)
- [ ] **VALIDATE:** Capture screenshot — verify 768px layout
- [ ] Add desktop breakpoint (3-4 columns)
- [ ] **VALIDATE:** Capture screenshot — verify 1280px layout

### Phase 6: Resource Cards
- [ ] Build ResourceCard structure (mobile-first)
- [ ] **VALIDATE:** Capture screenshot — verify card on mobile
- [ ] Style preview image area
- [ ] **VALIDATE:** Capture screenshot — verify image display
- [ ] Add file type indicators and icons
- [ ] **VALIDATE:** Capture screenshot — verify iconography
- [ ] Style metadata (title, description, date)
- [ ] **VALIDATE:** Capture screenshot — verify typography hierarchy
- [ ] Add external link indicator
- [ ] **VALIDATE:** Capture screenshot — verify indicator visibility
- [ ] Add hover states (desktop)
- [ ] **VALIDATE:** Capture screenshot — verify hover effect

### Phase 7: Data Integration
- [ ] Create resources.js with sample data
- [ ] Connect data to ResourceGrid
- [ ] **VALIDATE:** Capture screenshot — verify populated grid (all viewports)
- [ ] Implement section filtering
- [ ] **VALIDATE:** Capture screenshot — verify each section displays correctly
- [ ] Wire up download/link functionality
- [ ] **VALIDATE:** Test interactions work correctly

### Phase 8: Polish & Review
- [ ] Review all mobile screenshots for consistency
- [ ] **VALIDATE:** Full mobile screenshot audit
- [ ] Review tablet screenshots
- [ ] **VALIDATE:** Full tablet screenshot audit  
- [ ] Review desktop screenshots
- [ ] **VALIDATE:** Full desktop screenshot audit
- [ ] Fix any spacing, alignment, or visual issues
- [ ] **VALIDATE:** Final screenshot set for all pages/viewports

### Phase 9: Deployment
- [ ] Build production bundle
- [ ] Configure GitHub Pages
- [ ] Deploy and verify live site
- [ ] **VALIDATE:** Capture screenshots from production URL

---

## Appendix A: Asset Checklist

**Required before deployment:**

- [ ] Herb's House logo (PNG, transparent background)
- [ ] Preview images for each resource (recommended: 400x300px)
- [ ] Downloadable asset files (PDFs, ZIPs, etc.)
- [ ] External dashboard URLs
- [ ] Production passcode

---

## Appendix B: Reference Mockups

### Login Screen
```
┌─────────────────────────────────────┐
│                                     │
│          [Herb's House Logo]        │
│                                     │
│       ┌─────────────────────┐       │
│       │ Enter Passcode      │       │
│       │ ••••••••••          │       │
│       └─────────────────────┘       │
│                                     │
│       ┌─────────────────────┐       │
│       │   Enter Portal  →   │       │
│       └─────────────────────┘       │
│                                     │
│         Incorrect passcode          │
│                                     │
└─────────────────────────────────────┘
```

### Portal Main View
```
┌──────────────────────────────────────────────────────────────┐
│ [Logo] Herb's House Partner Portal    Marketing Sales Projects [Logout] │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   Marketing Resources                                        │
│                                                              │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│   │  [Preview]  │  │  [Preview]  │  │  [Preview]  │         │
│   │             │  │             │  │             │         │
│   │ PDF         │  │ ZIP         │  │ PDF         │         │
│   │ Brand Kit   │  │ Templates   │  │ Brew Guide  │         │
│   │ Description │  │ Description │  │ Description │         │
│   │ Jan 2, 2026 │  │ Dec 15, 25  │  │ Nov 1, 2025 │         │
│   └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                              │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│   │  [Preview]  │  │  [Preview]  │  │  [Preview]  │         │
│   │             │  │             │  │             │         │
│   │ ...         │  │ ...         │  │ ...         │         │
│   └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

*Document Version: 1.0*  
*Created: January 2, 2026*  
*Status: Ready for Implementation*
