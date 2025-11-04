const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const isDev = process.env.ELECTRON_ENV === 'development';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 720,
    minWidth: 360,
    minHeight: 640,
    backgroundColor: '#111827',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('load-songs', async () => {
  const songsPath = path.join(__dirname, 'songs.json');

  try {
    const fileContents = await fs.promises.readFile(songsPath, 'utf-8');
    const parsed = JSON.parse(fileContents);
    if (!Array.isArray(parsed)) {
      throw new Error('songs.json must export an array of tracks.');
    }
    return parsed;
  } catch (error) {
    console.error('Failed to read songs.json', error);
    throw error;
  }
});
