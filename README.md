# No Jokes Please (nojokesplease.github.io)

> **"A serious space for serious discussions."**

This repository contains the source code for [nojokesplease.github.io](https://www.google.com/search?q=https://nojokesplease.github.io "null"), a personal website hosted on GitHub Pages.

The project is designed with simplicity and performance in mind, utilizing pure static files without heavy frameworks or complex build processes.

## 🛠️ Tech Stack

- **HTML5**: Semantic structure.
- **CSS3**: Custom styling for a clean, minimalist layout.
- **JavaScript**: Minimal vanilla JS (if applicable).
- **Hosting**: GitHub Pages.

## 📂 Project Structure

The repository follows a clean and organized structure:

```
/
├── .github/        # GitHub Actions workflows (e.g., auto-screenshot)
├── extra/          # Utility scripts and Open Graph images
├── translations/   # Multi-language versions (e.g., /vi)
│   └── vi/         # Vietnamese translation
├── web/            # Core styles, scripts, and shared components (navbar)
├── index.html      # Main entry point (English version)
├── package.json    # Project dependencies and tool configurations
└── README.md       # Project documentation
```

## 🚀 Local Development

Since this project relies on static pages, no package managers (npm/yarn) or build steps are required for standard development.

**Note on Node.js/npm usage:**
Node.js is solely used for project automation and is **not required** to view or modify the site. Its purposes include:
- Generating the automatic OpenGraph (OG) image.
- Handling the i18n URL flattening during deployment.

### ⚡ JS-Free Compatibility
When deployed via GitHub Actions, the website is fully functional **even with JavaScript disabled**. The "Smart Flattening" process during deployment ensures all links work natively without the need for client-side corrections.

**JavaScript is purely optional** and is only used for:
- Cosmetic animations (e.g., typewriter effect).
- The "Copy Link" button functionality.

*Note: For those self-hosting on other platforms, ensure you use a service that supports the provided GitHub Actions workflow (or equivalent script) to maintain this JS-free link compatibility.*

1. **Clone the repository:**

    ```bat
    git clone https://github.com/nojokesplease/nojokesplease.github.io.git
    ```

2. **Run locally:**

    - Navigate to the project folder.

    - Simply open `index.html` in your web browser.

    - Or, for a better experience, use a simple HTTP server (e.g., Python 3):

        ```bat
        python -m http.server 8000
        ```

        Then visit `http://localhost:8000`.

## 🏗️ Deployment & URL Structure

This project uses a **"Smart Flattening"** strategy to keep the source code organized while ensuring beautiful URLs in production.

1. **Source Code**: Translations live in `translations/<lang>/` (e.g., `translations/vi/`).
2. **Production**: A [GitHub Action](.github/workflows/auto-screenshot.yml) automatically moves `translations/*` to the root directory during deployment.
   - **Result**: The live URL is `nojokesplease.github.io/vi/` (clean), instead of `.../translations/vi/`.
3. **Local Handling**: The `navbar.html` script contains a "smart linker" that detects if you are running locally (where the flattening hasn't happened). It checks if the production link exists; if not, it automatically redirects language links to `/translations/<lang>/` so you can develop without breaking navigation.

## 🤝 Contributing

Corrections and improvements are welcome. Please keep all contributions professional and consistent with the site's minimalist philosophy.

1. Fork the repository.
2. Create a feature branch.
3. Submit a Pull Request.

## 📄 License

This project is open source.

_Maintained by_ [_nojokesplease_](https://www.google.com/search?q=https://github.com/nojokesplease "null")
