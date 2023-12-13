const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const ssh = require('../legacy/ssh/ssh.js')

// Panel
var curPanelId = 0;
function panelCreatePanelId() {
  curPanelId = curPanelId + 1;
  console.log("panelCreatePanelId ", curPanelId);
  return curPanelId;
}

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
    width: 800,
    height: 600,
  })
  win.webContents.openDevTools()

  /* 需要在main 上显示的文字 */
  ipcMain.on('ssh-start-connect', (event) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    const sshInstance = new ssh("ssh-name");
    sshInstance.link(win, "ecs", 22, "root", 0, 0);
  })

  // test: load ssh
  //win.loadFile('../legacy/ssh/index.html')

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

  // Panel native method
  ipcMain.handle('panel:createPanelId', panelCreatePanelId)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
