import React from 'react';
import { Button, Flex, Divider, Col, Row } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

class WelcomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }

  handleClick = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <>
        <Flex justify='center'>
     
            <Title level={3}>Welcome to NxShell2</Title>
            
        </Flex>
        
        <Row justify='center' gutter={[48, 1]} >
            <Col span={6}>
                <Flex vertical={1}>
                    <Button type="text">
                        系统设置
                    </Button>
                    <Button type="text">
                        开源地址
                    </Button>
                    <Button type="text">
                        意见建议
                    </Button>
                    <Button type="text">
                        联系方式
                    </Button>
                </Flex>
                
                
            </Col>
            
            <Col span={6}>
                
                <Flex vertical={1}>
                    <Button type="text">
                        历史会话1
                    </Button>
                    <Button type="text">
                        历史会话2
                    </Button>
                </Flex>
            </Col>
            
        </Row>
      </>
          
    );
  }
}

export default WelcomeView;