import { Button, Flex, Divider, Col, Row } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
import { ApiOutlined } from '@ant-design/icons';

import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { FitAddon } from 'xterm-addon-fit';

const SSHView = () => {
  const termRef = useRef(null);

  useEffect(() => {
    const options = {
      cursorBlink: true, // 光标闪烁
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
      if (e.domEvent.keyCode === 13) {
        term.write('\r\n');
      } else {
        term.write(e.key);
      }
    })

    // 监听窗口大小变化事件
    const handleResize = () => {
      // 分屏 / 全屏等，计算此处的大小
      // TODO
      term.resize(80, 40);
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

  //return <div ref={termRef} style={{ width: '100%', height: '100%' }} />;
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