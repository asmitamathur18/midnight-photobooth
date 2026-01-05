# Midnight Photobooth

A minimal, cinematic web-based photobooth that captures four live camera photos, applies subtle editorial filters, and exports them as a classic photobooth strip.

Designed to feel quiet, moody, and analog — not flashy or gimmicky.

---

## Features

- Live webcam preview (desktop and mobile)
- Capture four photos in sequence
- Subtle, cinematic filters (live preview with accurate capture)
  - Clear (no filter)
  - Soft black and white
  - Cool night
  - Warm film
- Classic vertical photobooth strip layout
- Proper image download without cropping or preview tabs
- Fully responsive layout for desktop and mobile
- Camera remains live between shots

---

## How It Works

- Uses the MediaDevices API to access the device camera
- Filters are applied live using CSS filters on the video element
- Captured frames are rendered to a hidden canvas
- The final photobooth strip is composed on a separate canvas and exported as a PNG file

---

## Project Structure

photobooth/
├── index.html
├── style.css
├── script.js
└── README.md


---

## Mobile Support

- Uses `playsinline` and `facingMode: user`
- Automatically switches layout:
  - Desktop: camera and strip side by side
  - Mobile: camera on top with a horizontally scrollable strip below

---

## Output Details

- Exported as a single PNG photobooth strip
- Scaled to a print-friendly width
- Includes spacing between photos for an authentic photobooth look

---

## Credits

Built with plain HTML, CSS, and JavaScript.  
No frameworks. No external dependencies.
