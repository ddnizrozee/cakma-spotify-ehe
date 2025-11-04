const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadSongs: () => ipcRenderer.invoke('load-songs'),
});
