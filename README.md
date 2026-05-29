# Personal Portfolio Website

A professional, interactive single-page portfolio website built with HTML5, CSS3, and vanilla JavaScript — featuring animations, dark mode, form validation, and responsive design.

## Project Structure

```
Portfolio/
├── index.html        # Main portfolio page
├── style.css         # External stylesheet (~1300 lines)
├── script.js         # JavaScript functionality (~490 lines)
├── README.md         # This file
├── requirements.txt  # Tools & technologies list
├── images/           # Image assets
│   └── profile.jpg   # Profile picture
└── screenshots/      # Portfolio screenshots
```

## Sections

| Section     | Description                                              |
| ----------- | -------------------------------------------------------- |
| **Hero**    | Full-viewport intro with animated entrance & particles   |
| **About**   | Personal introduction with stats row                     |
| **Skills**  | Front-end, back-end, and tools with animated progress bars |
| **Contact** | Form with real-time JS validation and info cards         |

## Features

### HTML5
- Semantic tags (`header`, `nav`, `main`, `section`, `footer`)
- Internal anchor navigation with smooth scrolling
- Contact form with HTML5 validation attributes
- Accessible images with descriptive `alt` text
- External links with `rel="noopener noreferrer"`

### CSS3
- External stylesheet with ~45 CSS custom properties
- Flexbox and CSS Grid layouts
- Loading screen, floating particles, morphing background shapes
- Glassmorphism header (`backdrop-filter`)
- Staggered entrance animations (`@keyframes`)
- Scroll-reveal animations, animated skill progress bars
- Responsive design (768px and 480px breakpoints)
- `prefers-reduced-motion` accessibility support
- Dark mode theme via CSS class toggle

### JavaScript (7 Interactive Features)
1. **Dark Mode Toggle** — switches theme, saves preference to `localStorage`
2. **Form Validation** — real-time error/success feedback on blur and submit
3. **Typing Effect** — hero tagline types out character by character
4. **Stat Counter Animation** — numbers count up from 0 when scrolled into view
5. **Mobile Hamburger Menu** — toggles navigation on small screens
6. **Active Nav Highlighting** — nav links highlight based on scroll position
7. **Toast Notification System** — popup messages for form events and dark mode

### Reusable Functions
- `showToast()` — display notification messages
- `isValidEmail()` — regex email validation
- `showFieldError()` / `clearFieldError()` — inline form error management
- `saveToStorage()` / `getFromStorage()` — localStorage helpers
- `debounce()` — limits scroll event frequency

## How to View

1. Clone or download this repository.
2. Open `index.html` in any modern web browser.
3. No build step or server required.

## Technologies Used

- HTML5
- CSS3 (External Stylesheet)
- JavaScript (Vanilla ES5+)
- Google Fonts (Inter, Playfair Display)

## Author

**Saniya Perween**
- GitHub: [github.com/saniaperween572](https://github.com/saniaperween572)
- LinkedIn: [linkedin.com/in/saniya-perween-5596aa300](https://www.linkedin.com/in/saniya-perween-5596aa300/)
- Email: saniaperween572@gmail.com
