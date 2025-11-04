# Çakma Spotify (Desktop)

An offline-friendly music player that mimics a lightweight Spotify-style experience. The UI is
built with vanilla HTML, CSS, and JavaScript, while Electron wraps the site so it can run as a
self-contained desktop app. All audio and artwork stay on your machine—perfect for personal music
collections that you do not want to upload anywhere.

> **Need `npm`?** If your terminal says `'npm' is not recognized as an internal or external command`,
> install Node.js first (see the quick-start checklist below). Once `node` and `npm` exist, return to
> this folder and continue with `npm install`.

## Features

- Scrollable library view with cover art and track information
- Custom audio controls (play/pause, previous/next, progress bar, time display)
- "Now Playing" section with artwork, title, and artist metadata
- Responsive dark theme that adapts from mobile to widescreen layouts
- Electron wrapper so everything runs locally without depending on a web host

## Getting Started

### Quick-start checklist

1. **Install Node.js (includes npm)**
   - Windows: Download the LTS installer from [nodejs.org](https://nodejs.org/) or run
     `winget install OpenJS.NodeJS.LTS`. When the installer finishes, open a **new** Command Prompt
     so the updated PATH is loaded.
   - macOS: Use the pkg installer from [nodejs.org](https://nodejs.org/) or run `brew install node`.
   - Linux: Install via your distro (`sudo apt install nodejs npm`, `sudo dnf install nodejs`, etc.).
2. **Verify the tools**
   - Run `node --version` and `npm --version`. If either command fails, revisit step 1 and the
     [detailed Windows guide](docs/windows-node-setup.md).
3. **Install project dependencies**

```bash
npm install
```

4. **Add your music locally**

1. Copy your MP3/FLAC/etc. files into `assets/audio/` (this folder is ignored by git so your tracks
   stay private).
2. Add cover images to `assets/covers/` or reuse the provided `placeholder.png`.
3. Edit `songs.json` and add an entry for each track. Use relative paths, for example:

```json
{
  "title": "My Song",
  "artist": "Me",
  "cover": "assets/covers/my-song.png",
  "url": "assets/audio/my-song.mp3"
}
```

5. **Run the desktop app**

```bash
npm start
```

Electron launches a window and loads `index.html`. The preload script reads `songs.json` directly
from disk so the app works fully offline.

## Troubleshooting

- **`"npm is not recognized as an internal or external command"`** – Node.js is not installed or your
  terminal does not have Node on the PATH yet. Install Node.js from [nodejs.org](https://nodejs.org/),
  then open a new terminal window and try again. For screenshots and extra Windows tips see
  [docs/windows-node-setup.md](docs/windows-node-setup.md).
- **No songs appear** – Ensure `songs.json` is valid JSON and that every `url` points to an existing
  file inside `assets/audio/`.
- **Audio does not play** – Confirm the audio files are encoded in a format supported by Chromium
  (MP3, AAC, OGG, etc.).
- **Packaging for distribution** – You can integrate Electron Forge, Electron Builder, or Tauri to
  package installers. This repo keeps the setup minimal so you can pick whatever tooling you prefer.

## License

MIT