# Moka Studio - Developer Documentation

## 1. Project Overview
Moka Studio is a premium portfolio website for a 2D & 3D Animator, Director, and AI Video Creator. The site is designed to showcase high-end creative work through a cinematic, scroll-driven experience.

### Key Features
- **Cinematic Hero**: Immersive video background with smooth typography reveals.
- **Expanding About Section**: A scroll-triggered container that expands to full-screen, revealing the studio's philosophy.
- **Fan-out Projects Preview**: Interactive card fan-out effect for selected works.
- **Dynamic Projects Grid**: A responsive, premium grid layout for the full portfolio.
- **Scroll-driven Process Timeline**: A structured vertical timeline explaining the creative workflow.
- **Responsive Glass UI**: A consistent "liquid glass" design system used across all components.

---

## 2. Tech Stack
- **React**: Component-based UI architecture.
- **Tailwind CSS**: Utility-first styling with custom theme configurations.
- **Framer Motion**: Advanced scroll-driven animations and transitions.
- **Lucide React**: Minimalist icon set.

---

## 3. Folder Structure
- `/src/components`: Reusable UI sections (Hero, About, Projects, etc.).
- `/src/pages`: Main application pages (HomePage).
- `/src/assets`: Static assets like videos and images.
- `/src/index.css`: Global styles and Tailwind configuration.

---

## 4. Component Breakdown

### Hero (`Hero.tsx`)
The entry point of the site. Uses `useScroll` to fade out content and darken the background as the user scrolls down.

### About (`About.tsx`)
A high-impact section that uses scroll progress to scale a container from a centered card to a full-screen immersive experience.

### Projects Preview (`ProjectsPreview.tsx`)
Features a "fan-out" effect where project cards spread apart and rotate based on scroll position.

### Projects Grid (`ProjectsGrid.tsx`)
A masonry-style grid that uses `whileInView` for staggered entry animations.

### Process (`Process.tsx`)
A `400vh` section with a sticky container. It features a vertical line that grows with scroll progress and a dot that follows the active step.

### Contact (`Contact.tsx`)
A dual-panel layout (liquid glass style) that provides multiple ways to get in touch, optimized for mobile responsiveness.

---

## 5. Animation System
- **Scroll Animations**: Primarily handled via Framer Motion's `useScroll` and `useTransform` hooks.
- **Easing**: Consistent use of `cubic-bezier(0.22, 1, 0.36, 1)` for a premium, non-bouncy feel.
- **Staggered Reveals**: Used in grids and lists to guide the user's eye.

---

## 6. Responsive Strategy
- **Breakpoints**: Standard Tailwind breakpoints (`sm`, `md`, `lg`, `xl`).
- **Layout Shifts**: 
  - Grids transition from 1 column (mobile) to 2 (tablet) to 3 (desktop).
  - The Process timeline shifts from a centered layout to a more compact left-aligned layout on mobile.
- **Touch Targets**: All interactive elements (buttons, links) are sized for easy touch interaction on mobile.

---

## 7. Reusability Guidelines
- **Glass System**: Use the `liquid-glass` and `liquid-glass-strong` utility classes for consistent UI elements.
- **Section Wrapping**: All major sections should be wrapped in a `relative` container with appropriate vertical padding (`py-24` or `py-32`).
- **Motion Viewports**: Use `viewport={{ once: true, margin: "-100px" }}` for "reveal on scroll" elements to ensure they trigger at the right time.

---

## 8. Performance Notes
- **Video Optimization**: Background videos are muted, looped, and use `playsInline` for mobile compatibility.
- **Asset Loading**: Images use `referrerPolicy="no-referrer"` and are sourced from high-quality CDNs.
- **Animation Performance**: Animations are hardware-accelerated via Framer Motion (using `transform` and `opacity`).
