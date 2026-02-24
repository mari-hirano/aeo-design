# Webflow Prototype Starter Template

This is a template for building prototypes of Webflow UIs using realistic Spring Design System components. It is not intended for production use.

## Features

- Mock templates of both the Designer and Dashboard
- Realistic looking Spring components (themed shadcn components)
- [Style guide page](http://localhost:3000/spring/style-guide) for Spring components

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000/spring](http://localhost:3000/spring) in your browser.

**Note:** The app uses `basePath: '/spring'`, so the correct URL is **http://localhost:3000/spring** (not http://localhost:3000).

### Cursor preview (in-editor)

1. Start the dev server: **Terminal → Run Task… → Start Dev Server** (or run `npm run dev` in a terminal).
2. Wait until you see `Ready in …` and `Local: http://localhost:3000`.
3. Open Cursor’s Simple Browser: **Cmd+Shift+P** (Mac) or **Ctrl+Shift+P** (Windows/Linux) → run **“Simple Browser: Show”**.
4. Enter **http://localhost:3000/spring** and press Enter.

If the in-editor Simple Browser doesn’t load the app (known Cursor quirk), use your system browser at http://localhost:3000/spring instead.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting

## Customization

This template provides a minimal setup that you can easily customize:

1. Update the theme in `tailwind.config.js`
2. Modify the layout components in `src/components`
3. Add your own pages and components
4. Customize the navigation and mode switching functionality

## Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Root page
│   ├── globals.css          # Global styles
│   ├── dashboard/           # Dashboard routes
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── site/
│   │       └── settings/
│   ├── designer/            # Designer routes
│   ├── plan-tool/           # Plan tool routes
│   └── style-guide/         # Style guide routes
│       ├── layout.tsx
│       ├── page.tsx
│       └── components/
├── components/
│   ├── spring-ui/           # Spring Design System components
│   ├── designer/            # Designer interface components
│   │   ├── layout/          # Designer layout components
│   │   │   ├── Canvas.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── panels/      # Left/right panel components
│   │   ├── canvas-content/  # Canvas content components
│   │   │   └── pages/       # Page templates
│   │   └── sections/        # Layouts for App Gen, CMS, Insights...
│   │       ├── AppGen/
│   │       ├── CMS/
│   │       └── insights/
│   └── dashboard/           # Dashboard interface components
├── context/                 # React context providers
│   ├── ModeContext.tsx      # Mode switching context
│   ├── NavigatorContext.tsx # Navigation state context
│   └── PagesContext.tsx     # Pages state context
├── config/                  # Configuration files
├── lib/                     # Utility libraries
├── styles/                  # Global style files
└── icons/                   # Icon components
```


## Dependencies

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React (for icons)
- Radix UI (for UI components)

## License

MIT
