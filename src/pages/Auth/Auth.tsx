import React, { useState } from 'react'
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import './Auth.css';


type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


export default function Auth() {
  const [isLogin, setIsLogin] = useState(false)
  return (
    <div className='form_conteiner'>
      <Form
        className='form'
        name="basic"
        labelCol={{ span: 4 }}

        style={{ maxWidth: 500 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Логин"
          name="username"
          rules={[{ required: true, message: 'Введите логин' }]}
        >
          <Input />
        </Form.Item>


        {isLogin ? <></> :
          <Form.Item<FieldType>
            label="Почта"
            name="username"
            rules={[{ required: true, message: 'Введите почту' }]}
          >
            <Input />
          </Form.Item>
        }



        <Form.Item<FieldType>

          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password />
        </Form.Item>


        {isLogin ? <></> :
          <Form.Item<FieldType>

            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Введите пароль' }]}
          >
            <Input.Password />
          </Form.Item>
        }

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          style={{ alignSelf: 'center' }}
        >
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>

        <Form.Item style={{ alignSelf: 'center' }}>
          <Button type="primary" htmlType="submit">
            {isLogin ? 'Войти' : 'Регистрация'}
          </Button>
        </Form.Item>

        {/* пока такие онклики, потом мб по ссылке менять не состояние, а перекидывать на другой роут чела*/}
        <Form.Item style={{ alignSelf: 'center' }}>
          {isLogin ?
            <div >
              Нет аккаунта? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setIsLogin(!isLogin)}>Зарегистрироваться</span>
            </div>
            :
            <div>
              Есть аккаунт? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setIsLogin(!isLogin)}>Войти</span>
            </div>
          }
        </Form.Item>

      </Form>
    </div>
  )
}
