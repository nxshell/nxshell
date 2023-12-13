/*
 * 我们采用IPC 模型
 */

//const { spawn } = require('child_process');
var os = require('os');
var pty = require('node-pty');
var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

class SSH {
    constructor(name) {
      this.ssh_remote = null;
      this.name = name;
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
        bw.webContents.send('ssh-contents', data)
      });
    }

    unlink() {

    }

    //
    stdin(bw, body) {
      this.ssh_remote.write(body.value)
    }
  }
  

  // 导出类的一个实例
  module.exports = SSH;