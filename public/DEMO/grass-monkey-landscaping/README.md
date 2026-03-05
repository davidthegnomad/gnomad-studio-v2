<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: <https://ai.studio/apps/281e3172-3101-4ed9-ba00-d67ef6743494>

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Mobile Responsiveness (MOBIUS Report)

This project follows a "Mobile First" design strategy. Key adaptations for mobile performance and usability include:

* **Adaptive Navigation**: Horizontal desktop navigation converts to a high-contrast full-screen drawer on mobile (under 1024px).
* **Touch Targets**: All interactive elements (Request Bid, Call Now) meet the minimum 44x44px touch-target standard.
* **Typography Scales**: Fluid typography ensures legibility on smaller screens without horizontal scrolling.
* **Performance**: Large hero assets are optimized and lazy-loaded where applicable.

**Breakpoints used:**

* `sm`: 640px (Small phones)
* `md`: 768px (Tablets)
* `lg`: 1024px (Laptops/Desktop)

**Testing:**
Testing can be performed using Chrome DevTools (F12 > Toggle Device Toolbar) or by resizing the browser window to the breakpoints listed above. Ensure the "One-Tap Text/Call" functionality works on physical mobile devices.
