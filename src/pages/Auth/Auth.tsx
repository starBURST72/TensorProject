import React, { useContext, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import './Auth.css';
import { Context } from '../../index';
import { observer } from "mobx-react-lite";

type LoginFields = {
  username: string;
  password: string;
  remember: boolean;
};

type RegisterFields = {
  email: string;
  username: string;
  password: string;
  verifyPassword: string;
};

const onFinishFailed: FormProps<LoginFields>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Auth: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const { store } = useContext(Context);

  const [isAuthForm, setIsAuthForm] = useState(false);

  const onFinish = async (values: LoginFields | RegisterFields) => {
    try {
      if ('email' in values) {
        await store.reg(values.email, values.username, values.password);
      } else {
        await store.login(values.username, values.password);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='form_conteiner'>
      <Form
        className='form'
        name="basic"
        labelCol={{ span: 6 }}
        style={{ maxWidth: 500 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {isAuthForm ? (
          <>
            <Form.Item<LoginFields>
              label="Логин"
              key="username"
              name="username"
              id='login'
              rules={[{ required: true, message: 'Введите логин' }]}
            >
              <Input
                onChange={e => setUsername(e.target.value)}
                value={username}
                placeholder='Логин'
              />
            </Form.Item>
            <Form.Item<LoginFields>
              label="Пароль"
              name="password"
              key="password"
              id='password'
              rules={[
                { required: true, message: 'Введите пароль' },
                { min: 5, message: 'Пароль должен быть не менее 5 символов' },
              ]}
            >
              <Input.Password
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder='Пароль'
              />
            </Form.Item>
            <Form.Item<LoginFields>
              name="remember"
              valuePropName="checked"
              style={{ alignSelf: 'center' }}
            >
              <Checkbox>Запомнить меня</Checkbox>
            </Form.Item>
            <Form.Item style={{ alignSelf: 'center' }}>
              <Button type="primary" htmlType="submit">
                Вход
              </Button>
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item<RegisterFields>
              label="Почта"
              key="email"
              name="email"
              id='email'
              rules={[
                {
                  type: 'email',
                  message: 'Некорректный email!',
                },
                {
                  required: true,
                  message: 'Пожалуйста, введите почту!',
                },
              ]}
            >
              <Input
                onChange={e => setEmail(e.target.value)}
                value={email}
                placeholder="Почта"
              />
            </Form.Item>
            <Form.Item<RegisterFields>
              label="Логин"
              key="username"
              name="username"
              id='login'
              rules={[{ required: true, message: 'Введите логин' }]}
            >
              <Input
                onChange={e => setUsername(e.target.value)}
                value={username}
                placeholder='Логин'
              />
            </Form.Item>
            <Form.Item<RegisterFields>
              label="Пароль"
              name="password"
              key="password"
              id='password'
              rules={[
                { required: true, message: 'Введите пароль' },
                { min: 5, message: 'Пароль должен быть не менее 5 символов' },
              ]}
            >
              <Input.Password
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder='Пароль'
              />
            </Form.Item>
            <Form.Item<RegisterFields>
              label="Повторите пароль"
              name="verifyPassword"
              key="verifyPassword"
              id='verifyPassword'
              dependencies={['password']}
              rules={[
                { required: true, message: 'Пожалуйста, введите пароль еще раз!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Пароли не совпадают!'));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder='Повторите пароль'
              />
            </Form.Item>
            <Form.Item style={{ alignSelf: 'center' }}>
              <Button type="primary" htmlType="submit">
                Регистрация
              </Button>
            </Form.Item>
          </>
        )}
        <Form.Item style={{ alignSelf: 'center' }}>
          {isAuthForm ? (
            <div>
              Нет аккаунта? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setIsAuthForm(!isAuthForm)}>Зарегистрироваться</span>
            </div>
          ) : (
            <div>
              Есть аккаунт? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setIsAuthForm(!isAuthForm)}>Войти</span>
            </div>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default observer(Auth);
