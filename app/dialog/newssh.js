import React, { useState } from 'react';
import { Button, Form, Input, Select, Space, Divider } from 'antd';
import SSHView, {SSHViewNavMenu} from '../view/sshview'

const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
const formItemLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 16,
    },
};
const NewSSHContents = ({onSubmit}) => {
    const [form] = Form.useForm();

    const onAuthTypeChange = (value) => {
        switch (value) {
            case 'male':
                form.setFieldsValue({
                    note: 'Hi, man!',
                });
                break;
            case 'female':
                form.setFieldsValue({
                    note: 'Hi, lady!',
                });
                break;
            case 'other':
                form.setFieldsValue({
                    note: 'Hi there!',
                });
                break;
            default:
        }
    };

    const onFinish = (values) => {
        // Call native module to create a new ssh session
        window.electronAPI.sshStartConnect(values);

        // Tell parents so they have chances to do something
        values.action = 'add';
        values.viewClass = SSHView;
        values.navMenuClass = SSHViewNavMenu;
        onSubmit(values)
    };
    const onReset = () => {
        form.resetFields();
    };

    return (
        <>
                <p>
                    创建SSH 链接，请填写链接配置信息。创建好后，系统将保存配置，您可以通过'名称'从历史记录中直接再次链接SSH。
                 </p>
                <Divider orientation="middle" plain>

                </Divider>

                <Form
                    {...layout}
                    form={form}
                    name="new-ssh-list"
                    onFinish={onFinish}

                    style={{
                        maxWidth: 600,
                    }}
                >
                    <Form.Item
                        {...formItemLayout}
                        name="name"
                        label="名称"
                        tooltip="系统将配置保存起来，通过此处的‘名称’你可以从历史链接中直接再次链接到本次配置的主机"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        name="ip"
                        label="地址"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        name="port"
                        label="端口"
                        initialValue="22"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        name="username"
                        label="登录名"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        {...formItemLayout}
                        name="authtype"
                        label="认证方式"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="选择一种密码校验方式"
                            onChange={onAuthTypeChange}
                            allowClear
                        >
                            <Option value="password">密码</Option>
                            <Option value="sshkey">密钥</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.authtype !== currentValues.authtype}
                    >
                        {({ getFieldValue }) => {
                            if (getFieldValue('authtype') === 'password') {
                                return (
                                    <Form.Item
                                        {...formItemLayout}
                                        name="authpassword"
                                        label="密码"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                );
                            }
                            else if (getFieldValue('authtype') === 'sshkey') {
                                return (
                                    <Form.Item
                                        {...formItemLayout}
                                        name="authsshkey"
                                        label="密钥"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                );
                            }
                        }
                        }
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                链接
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                重置
                             </Button>
                        </Space>
                    </Form.Item>
                </Form>
        </>
    );
};
export default NewSSHContents;
