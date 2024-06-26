import React from 'react';
import { Form, Input, Space, Typography } from 'antd';

type SettingsInputProps = {
    title: string
    classNameFormItemInput: string
    key: string
    name: string
    id: string
    placeholder: string
    classNameSpace: string
    rules: [{}]

};

const SettingsInput: React.FC<SettingsInputProps> = ({ title, classNameFormItemInput, key, name, id, placeholder, classNameSpace, rules }) => {
    return (
        <Space.Compact className={classNameSpace} size='middle' direction='vertical' key={key} >
            <Typography.Title level={5}>{title}</Typography.Title>
            <Form.Item
                key={key}
                name={name}
                id={id}
                rules={rules}

            >
                {name === 'username' || name === 'email'
                    ?
                    <Input disabled key={key} placeholder={placeholder} className={classNameFormItemInput} />
                    :
                    <Input key={key} placeholder={placeholder} className={classNameFormItemInput} />
                }
            </Form.Item>
        </Space.Compact>
    );
};

export default SettingsInput;