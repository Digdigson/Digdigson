# Music Portfolio Website - HTML Version

A standalone HTML version of the music portfolio website that runs directly in your browser without any build process or server.

## How to Use

1. **Open the file**: Simply double-click `index.html` or open it in any web browser
2. **Add your music files**: Place your audio files in a `music/` folder in the same directory as `index.html`
   - Update the track URLs in the HTML file (search for `data-url="music/track1.mp3"`)
3. **Customize content**: Edit `index.html` directly to update:
   - Your name in the Hero section
   - Biography text
   - Credits/projects
   - News items
   - Contact information
   - Track titles and descriptions

## Features

- ✅ Fully functional audio player with playlist
- ✅ Smooth scrolling navigation
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Mobile menu
- ✅ Scroll animations
- ✅ External music platform links
- ✅ No build process required
- ✅ Works offline (after initial load of CDN resources)

## File Structure

```
.
├── index.html          # Main HTML file (open this in browser)
└── music/              # Place your audio files here
    ├── track1.mp3
    ├── track2.mp3
    └── track3.mp3
```

## Customization

### Update Track Information

Find the track buttons in the Music section and update:
- `data-title`: Track title
- `data-desc`: Track description
- `data-url`: Path to your audio file

### Update Contact Information

Find the contact section and update the email addresses and social media links.

### Change Colors

The website uses Tailwind CSS via CDN. You can modify classes directly in the HTML or add custom CSS in the `<style>` section.

## Browser Compatibility

Works in all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Notes

- The page loads Tailwind CSS and Font Awesome icons from CDN, so an internet connection is required for the first load
- Audio files should be in MP3 format for best browser compatibility
- Make sure audio file paths are correct relative to the HTML file location

