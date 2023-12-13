const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  sshStartConnect: () => ipcRenderer.send('ssh-start-connect'),
  onUpdateSSHContentsArea: (callback) => ipcRenderer.on('ssh-contents', (_event, value) => callback(value)),

  // Panel -> Native
  panelCreatePanelId: () => ipcRenderer.invoke('panel:createPanelId'),

})

