import React, { useState } from 'react';
import { Menu, ConfigProvider, Modal, Flex, Title } from 'antd';
import NewSSHContents from '../dialog/newssh';
import NewSettingContents from '../dialog/setting'; 
import { PlusOutlined } from '@ant-design/icons';

const style1 = {
    marginLeft: '8pt',
};

// TODO：Children 中历史记录需要动态加载
const addnewChildren = [
    {
      type: 'group',
      label: '新建',
      children: [
        {
          label: 'SSH 链接',
          key: 'ssh',
        },
        {
          label: 'RDP 远程桌面',
          key: 'rdp',
        },
      ],
    },
    {
        type: 'group',
        label: '系统',
        children: [
          {
            label: '设置',
            key: 'setting',
          },
        ],
    },
    {
      type: 'group',
      label: '历史记录',
      children: [
        {
          label: 'AWS',
          key: 'aws0',
        },
        {
          label: 'Aliyun',
          key: 'ali0',
        },
      ],
    },
];

class PanelNavTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        ...props,
        showModal: false,
        currentTab: 'addnew',
        modalTitle: "NoTitle",
        items:[
            
            {
              label: '',
              key: 'addnew',
              title: '创建新会话',
              icon: <PlusOutlined style={style1}/>,
              children: addnewChildren,
            }],
    };
  }

  render() {
    var i;
    const getSSHModalBody = () => {
        return (
            <NewSSHContents onSubmit={handleModalSubmit} />
        );
    }
    
    const getSettingModalBody = () => {
        return (
            <NewSettingContents onSubmit={handleModalSubmit} />
        );
    }

    const showModal = () => {
        this.setState({showModal: true});
    };

    const closeModal = () => {
        this.setState({showModal: false});
    };
    
    const handleModalSubmit = (submit) => {
        console.log("Get submit return.", submit);
        closeModal();

        // Call parents that we may need a new view
        this.props.onSubmit(submit);
    }

    // 导航内容按需创建，从系统中心拉去该NAV 需要显示几个导航
    const items = [...this.props.navItems, ...this.state.items];

    // 菜单点击，包括子菜单内容
    const onClick = (e) => {
        console.log('click ', e);
        
        // 弹出对话框配置新建的链接会话
        if (e.key == 'ssh') {
            // 将ssh 的内容填充到对话框中
            this.setState({modalText:getSSHModalBody()})
            this.setState({modalTitle:"新建SSH链接"});
            showModal();

        } else if (e.key == 'rdp') {

        } else if (e.key == 'setting') {
            this.setState({modalText:getSettingModalBody()})
            showModal();
        } else {
          this.setState({currentTab: e.key});
          // Normal tab
          this.props.onClickTap(e.key);
        }
    };

    const handleModalCancel = () => {
        closeModal();
    };

    const current = this.state.currentTab;
    return (
        <>
        <ConfigProvider
          theme={{
              components: {
              Menu: {
                  itemPaddingInline:4,
              },
              },
          }}
          >
              <Menu key="menu1" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} triggerSubMenuAction="click" />
            
        </ConfigProvider>


        <Modal
            title={this.state.modalTitle}
            open={this.state.showModal}
            footer={null}
            onCancel={handleModalCancel}
        >
            {this.state.modalText}
        </Modal>

        </>
    );
  }
}

export default PanelNavTop;