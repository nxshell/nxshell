const sshContentsArea = document.getElementById('sshContentsArea');
/*
input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    window.electronAPI.setTitle(input.value)
  }
});*/

window.electronAPI.onUpdateSSHContentsArea((contents) => {
  let string = String.fromCharCode.apply(null, contents);
  sshContentsArea.value = string;
  const lines = string.split('\n')
  if (lines.length > 10000) {
    lines.shift()
  }
  // Scroll to the bottom
  sshContentsArea.scrollTop = sshContentsArea.scrollHeight;    
})