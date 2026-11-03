const { app, BrowserWindow, Menu } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1366,
    height: 768,
    fullscreenable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  win.loadURL(process.env.ELECTRON_START_URL || 'http://localhost:5173/pos');
  Menu.setApplicationMenu(null);
}

app.whenReady().then(createWindow);
