const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const SSH = require('../legacy/ssh/ssh.js')

// Panel
var curPanelId = 0;

// Panel
function panelCreatePanelId() {
  curPanelId = curPanelId + 1;
  console.log("panelCreatePanelId ", curPanelId);
  return curPanelId;
}

const createWindow = () => {
  const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
    width: Math.floor(width / 2),
    height,
  })
  win.webContents.openDevTools();

  // Load 主页面，其他交给JS
  win.loadFile('./index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  var ssh = new SSH();
  // Panel native method
  ipcMain.handle('panel:createPanelId', panelCreatePanelId)

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
