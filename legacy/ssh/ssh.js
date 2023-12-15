var os = require('os');
var pty = require('node-pty');
var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
const { BrowserWindow, ipcMain } = require('electron/main')

// A ssh instance
class SSHInstance {
  constructor(sessionId) {
    this.ssh_remote = null;
    this.sid = sessionId;
  }

  link (bw, ip, port, username, authtype, password) {
    
    var cmd = `ssh ${username}@${ip}` + ' -p ' + `${port}`;
    console.log("Startup ssh with cmd", cmd);
    var ptyProcess = pty.spawn(shell, ['-c', cmd], {
      name: 'xterm-color',
      // Should same with UI
      // TODO
      cols: 80,
      rows: 30,
      cwd: process.env.HOME,
      env: process.env
    });

    /* Fork a native ssh process */
    this.ssh_remote = ptyProcess;
    ptyProcess.onData((data) => {
      // sshd to UI
      bw.webContents.send('ssh-contents', {contents:data,sessionId:this.sid})
    });
  }

  unlink() {

  }

  stdin(bw, body) {
    this.ssh_remote.write(body.value)
  }
}

// The ssh manager
function sshStartConnect(event, body) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  console.log("ssh-start-connect with body", body);
  var id = this.create(win, body.ip, body.port, body.username, body.authtype, body.authpassword);
  return {sessionId:id}
}

function sshRecvKey(event, body) {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    console.log("ssh-recv-key", body);
    this.instances[body.sessionId].stdin(win, body);
}

class SSH {
    constructor() {
      this.sid = 0;
      this.instances = []

      // SSH native method
      ipcMain.handle('ssh-start-connect', sshStartConnect.bind(this));
      ipcMain.on('ssh-recv-key', sshRecvKey.bind(this));
    }
  
    create (bw, ip, port, username, authtype, authkey) {
      var id = this.sid++;
      var ssh = new SSHInstance(id);
      ssh.link(bw, ip, port, username, authtype, authkey);
      this.instances.push(ssh);
      return id;
    }

    delete (sid) {
      // TODO
    }
  }
  

  // 导出类的一个实例
  module.exports = SSH;