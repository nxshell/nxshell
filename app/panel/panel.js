import React, { useState } from 'react';
import PanelNavTop from './navtop';

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }

  /**
   * 若干view 属于一个panel，因此相同panelId 的View属于同一个panel，归并到PanelNavTop下。
   */
  render() {
    const handleSubmit = (value) => {
      this.props.onSubmit(value)
    }

    return (
      <PanelNavTop navItems={this.props.navItems} onSubmit={handleSubmit}/>
    );
  }
}

export default Panel;