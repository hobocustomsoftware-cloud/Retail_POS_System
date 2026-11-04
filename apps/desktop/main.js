const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 768,
    fullscreenable: true,
    title: 'Retail POS - HoBo Custom Software',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  Menu.setApplicationMenu(null);

  if (app.isPackaged) {
    // Production EXE: load built web files
    win.loadFile(path.join(__dirname, '../web/dist/index.html'));
  } else {
    // Dev mode: load from Vite dev server
    const startUrl = process.env.ELECTRON_START_URL || 'http://localhost:5173/#/pos';
    win.loadURL(startUrl);
  }
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
