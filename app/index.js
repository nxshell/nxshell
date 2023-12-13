const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const ssh = require('../legacy/ssh/ssh.js')

// Panel
var curPanelId = 0;

// Legacy module
var sshInstances = [0];

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

  /* 需要在main 上显示的文字 */
  ipcMain.on('ssh-start-connect', (event, body) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    sshInstances[0] = new ssh("ssh-name");
    console.log("ssh-start-connection", body);
    sshInstances[0].link(win, body.ip, body.port, body.username, body.authtype, body.authpassword);
  })
  ipcMain.on('ssh-recv-key', (event, body) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    console.log("ssh-recv-key", body);
    sshInstances[0].stdin(win, body);
  })

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
