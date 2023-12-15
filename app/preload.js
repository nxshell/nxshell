const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  // UI call Native
  sshStartConnect: (body) => ipcRenderer.invoke('ssh-start-connect', body),
  sshRecvKey: (body) => ipcRenderer.send('ssh-recv-key', body),

  // UI listen Native
  onUpdateSSHContentsArea: (callback) => ipcRenderer.on('ssh-contents', (_event, value) => callback(value)),

  // Panel -> Native
  panelCreatePanelId: () => ipcRenderer.invoke('panel:createPanelId'),

})

