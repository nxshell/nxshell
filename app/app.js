import React, {useState, useEffect} from 'react';
import Panel from './panel/panel'
import ReactDOM from 'react-dom';
import { HomeOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
const { Content } = Layout;

import NewSSHDialogContents from './dialog/newssh';
import NewSettingContents from './dialog/setting'; 
import WelcomeView from './view/welcome';
import SSHView from './view/sshview';

const App = () => {
    const [panelId, setPanelId] = useState(null);
    const [viewContentsToggle, setViewContentsToggle] = useState([1]);
    const [viewContents, setViewContents] = useState(
        [
            {
                views: [
                    (<WelcomeView />)
                ],
                menus: [
                    {
                        label: 'Welcome',
                        key: 'welcome',
                        icon: <HomeOutlined />,
                    },
                ]
            }
        ]
    );

    useEffect(() => {
        const fetchData = async () => {
            const id = await window.electronAPI.panelCreatePanelId();
            setPanelId(id);
        };

        fetchData();
    }, []);

    function deepCopy(obj) {
        if (obj === null || typeof obj !== 'object') {
          return obj;
        }
      
        let copy = Array.isArray(obj) ? [] : {};
      
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key]);
          }
        }
      
        return copy;
    }

    const onSubmit = (value) => {
        var i;

        // Add new
        const menu = value.navMenuClass(0/*TODO menu idx*/);
        const myComponent = <value.viewClass />
        viewContents[0].views.push(myComponent);
        viewContents[0].menus.push(menu);

        // Close all
        for (i = 0; i < viewContentsToggle.length; i++)
            viewContentsToggle[i] = 0;
        setViewContentsToggle([...viewContentsToggle, 1]);
    }

    /**
     * TODO：Feature1: 根据上一次的运行状态进行恢复（比如打开了哪些窗口，布局如何）
     */
    const views = viewContents[0].views.map((view, index) => {
        if (viewContentsToggle[index]) {
            return view;
        }
        return null;
    });
    const navItems = viewContents[0].menus;
    console.log("views loop", views, "panelId", panelId, "navItems", navItems);

    /**
     * 启动默认布局
     */
    if (panelId == null)
        return null;
    /*
    return (
            <div>
                <SSHView />
            </div>  
    );
    */
    return (
        <Layout >
            <Content>
                {/* 内容部分 */}
                <div>
                    {/* 这里放置你的组件内容 */}
                    <Panel panelId={panelId} onSubmit={onSubmit} navItems={navItems}/>
                    {views}        
                </div>
            </Content>
        </Layout>
     )
};

export default App;