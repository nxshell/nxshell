import React, {useState, useEffect} from 'react';
import WelcomeView from './view/welcome';
import Panel from './panel/panel'
import ReactDOM from 'react-dom';
import { HomeOutlined } from '@ant-design/icons';

import NewSSHDialogContents from './dialog/newssh';
import NewSettingContents from './dialog/setting'; 

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
    return (
        <>
        <Panel panelId={panelId} onSubmit={onSubmit} navItems={navItems}/>
        {views}
        </>
     )
};

export default App;