import React, { useState } from 'react';
import PanelNavTop from './navtop';
import WelcomeView from '../view/welcome';
import { HomeOutlined } from '@ant-design/icons';

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        ...props,
        menuIdx: 0,
        viewContents: [
          {
          key: "view-contents-div-welcome",
          body: (<WelcomeView key="view-contents-welcome"/>),
          visible: true,
          }
        ],
        menuContents: [
          {
          label: 'Welcome',
          key: 'welcome',
          icon: <HomeOutlined />,
          }
        ],
    };
  }
  render () {
    const onSubmit = (value) => {
      const menuIdx = this.state.menuIdx;
      // Create new
      const menu = value.navMenuClass(menuIdx);
      console.log("add new item, menu", menu)
      const view = (
        {
          key: "view-contents-div-" + menu.key,
          body: <value.viewClass key={"view-contents-" + menu.key}/>,
          visible: true
        }
      );

      // Update
      this.setState({viewContents: [...this.state.viewContents, view]});
      this.setState({menuContents: [...this.state.menuContents, menu]});
      this.setState({menuIdx: menuIdx+1});
      toggleVissible(view.key);
    }

    const toggleVissible = (key) => {
      let n = this.state.viewContents.map((c) =>
        c.key === key? {...c, visible:true}:{...c, visible:false});
      this.setState({viewContents:n});
    }

    /**
     * 点击了Panel 标签
     */
    const onClickTap = (which) => {
      toggleVissible('view-contents-div-' + which);
    }

    const views = this.state.viewContents;
    const navItems = this.state.menuContents;

    return (
      <>
        <PanelNavTop navItems={navItems} onSubmit={onSubmit} onClickTap={onClickTap} key="panelNavTop" />
        {
          views.map((v) => (
            <div style={{"display":v.visible?"block":"none"}} key={v.key}>
            {v.body}
            </div>
          ))
        }
      </>
      );
    }
}

export default Panel;

/*
{Object.entries(viewContents.views).map(([componentName], index) => (
  viewContents.menus[index]._show && React.createElement(
    viewContents.menus[index]._value, {id:"panel_in" + index, key:"panel_in" + index})
))}
*/