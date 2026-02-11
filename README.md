# Tech Blog & Linux Command Reference

A personal tech blog, Linux command reference, and portfolio built as a static website. Features a modern dark/light theme and a hidden blog post editor for easy content management.

## Features

- **Blog Section** - Tech articles with syntax-highlighted code blocks
- **Linux Command Reference** - 27 categories covering system administration, networking, and security
- **Portfolio** - Education, leadership, skills, and work experience
- **Search Functionality** - Real-time search across all commands
- **Copy-to-Clipboard** - One-click copying for command examples
- **Syntax Highlighting** - Powered by Highlight.js
- **Dark/Light Mode** - Toggle with persistent preference
- **Blog Post Editor** - Hidden admin feature for creating new posts (Ctrl+Shift+E)

## Project Structure

```
webpage/
├── index.html          # Main HTML file
├── styles.css          # All styling (dark/light themes)
├── script.js           # Core functionality
├── blog-posts/         # Blog post HTML files
│   └── posts.json      # Blog post metadata
└── sections/           # Command reference HTML files
    ├── home.html
    ├── file-dir.html
    ├── network.html
    └── ...
```

## Usage

### Running Locally

Simply open `index.html` in a web browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve
```

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Escape` | Clear search |
| `Ctrl+Shift+E` | Reveal blog post editor |

### Creating Blog Posts

1. Press `Ctrl+Shift+E` to reveal the editor button
2. Click "New Post" to open the editor
3. Fill in the title, tag, excerpt, and content
4. Use the toolbar for formatting (H2, H3, bold, code blocks, etc.)
5. Preview your post or generate the HTML/JSON
6. Copy the generated files to `blog-posts/` folder
7. Add the JSON entry to `posts.json`

## Command Categories

- File & Directory Navigation
- File Operations
- Permissions
- Disk & Memory
- Process Management
- Network
- SSH & Remote
- Text Processing
- Archive & Compression
- System Info
- And 17 more security/pentesting categories...

## Technologies

- HTML5 / CSS3 / Vanilla JavaScript
- [Highlight.js](https://highlightjs.org/) for syntax highlighting
- No build tools or frameworks required

## Deployment

This is a static site that can be hosted on:
- GitHub Pages
- Netlify
- Vercel
- Any static file server

## License

MIT License - Feel free to use and modify for your own projects.
