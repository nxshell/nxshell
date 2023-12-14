import React, {useState, useEffect} from 'react';
import Panel from './panel/panel'

import NewSSHDialogContents from './dialog/newssh';
import NewSettingContents from './dialog/setting'; 
import SSHView from './view/sshview';

const App = () => {
    const [panelId, setPanelId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const id = await window.electronAPI.panelCreatePanelId();
            setPanelId(id);
        };

        fetchData();
    }, []);

    /**
    * TODO：Feature1: 根据上一次的运行状态进行恢复（比如打开了哪些窗口，布局如何）
    */
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
                <div>
                    {/* 这里放置你的组件内容 */}
                    <Panel panelId={panelId} key="panel1"/>   
                </div>
     )

     //return (
     //   <Layout >
     //       <Content>
     //           {/* 内容部分 */}
     //           <div>
     //               {/* 这里放置你的组件内容 */}
     //               <Panel panelId={panelId} onSubmit={onSubmit}/>
     //               {views}        
     //           </div>
     //       </Content>
     //   </Layout>
     //)
};

export default App;