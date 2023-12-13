import { Button, Flex, Divider, Col, Row } from 'antd';
import { Typography } from 'antd';
import { ApiOutlined } from '@ant-design/icons';

import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

const SSHView = () => {
  const termRef = useRef(null);
  var sshContentsArea = "";

  useEffect(() => {
    const options = {
      cursorBlink: true, // 光标闪烁
      fontFamily: '"DejaVu Sans Mono", monospace',
      termName: 'xterm', 
      // 其他窗口选项...
    };
    const term = new Terminal(options);
    
    term.open(termRef.current);
    // 保存终端实例到 ref 中，以便在组件中访问
    termRef.current = term;

    // Write some content to the terminal
    term.write('NxShell2 startup...\r\n');

    // listen
    term.focus();
    term.onKey(e => {
      // 回车键
      if (e.domEvent.keyCode === 13) {
        term.write('\r\n');
        sendKeyToSSHD('\n');
      } else {
        term.write(e.key);
        sendKeyToSSHD(e.key);
      }
    })

    // 监听窗口大小变化事件
    const handleResize = () => {
      // 分屏 / 全屏等，计算此处的大小
      // TODO
      term.resize(120, 40);
    };
    window.addEventListener('resize', handleResize);

    // 手动触发一次以确保初始大小正确
    handleResize();

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      term.dispose();
    };
  }, []);

  const sendKeyToSSHD = (key) => {
    try {
      // Add logic to send key to sshd
      window.electronAPI.sshRecvKey({ value: key });
    } catch (error) {
      console.error('Error sending key to sshd:', error);
    }
  };

  useEffect(() => {
    const updateSSHContentsArea = (contents) => {
      const string = String.fromCharCode.apply(null, contents);
      if (termRef.current) {
        termRef.current.write(string);
      }
    };

    window.electronAPI.onUpdateSSHContentsArea(updateSSHContentsArea);

    return () => {
      //window.electronAPI.offUpdateSSHContentsArea(updateSSHContentsArea);
    };
  }, []);


  return (
    <div ref={termRef}></div>
  )
};

export default SSHView;

export const SSHViewNavMenu = (idx) => {
  return {
    label: 'SSH 链接',
    key: 'ssh' + idx,
    title: 'ssh' + idx,
    icon: <ApiOutlined/>,
  }
}