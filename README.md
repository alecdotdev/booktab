# BookTab

A minimal Firefox extension that replaces your new tab page with a clean, searchable list of all your bookmarks.

## Features

- **Filter bar** — instantly search bookmarks by title or URL, auto-focused on every new tab
- **Keyboard shortcuts** — `Ctrl+F` to focus the filter, `Enter` to open the first result, `Esc` to unfocus
- **Dark / light mode** — defaults to dark, persisted across sessions
- **Favicons** — fetched and cached for each bookmark
- **Smooth animations** — slide transitions when filtering results

## Install

[**Get BookTab on Firefox Add-ons**](https://addons.mozilla.org/en-US/firefox/addon/booktab/)

## Build from source

```bash
npm install
npm run build
```

Load the `dist/` folder as a temporary extension in `about:debugging`.
