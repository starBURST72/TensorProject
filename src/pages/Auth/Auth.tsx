import React, { useContext, useState } from 'react'
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import './Auth.css';
import { Context } from '../../components/Context/AppContext';
import { start } from 'repl';

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
  const { isAuth, setAuth } = useContext(Context);

  const [isAuthForm, setIsAuthForm ] = useState(false);

  const login = () => {
    setAuth(true)
    localStorage.setItem('auth', 'true');
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
        <Form.Item<FieldType>
          label="Логин"
          name="username"
          rules={[{ required: true, message: 'Введите логин' }]}
        >
          <Input />
        </Form.Item>


        {isAuthForm ? <></> :
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


        {isAuthForm ? <></> :
          <Form.Item<FieldType>
            className="form-item-label"
            label="Повторите пароль"
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
            {isAuthForm ? <span onClick={() => login()}>Войти</span> : 
            <span onClick={() => login()}>Регистрация</span>}
          </Button>
        </Form.Item>

        {/* пока такие онклики, потом мб по ссылке менять не состояние, а перекидывать на другой роут чела*/}
        <Form.Item style={{ alignSelf: 'center' }}>
          {isAuthForm ?
            <div >
              Нет аккаунта? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setIsAuthForm(!isAuthForm)}>Зарегистрироваться</span>
            </div>
            :
            <div>
              Есть аккаунт? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setIsAuthForm(!isAuthForm)}>Войти</span>
            </div>
          }
        </Form.Item>

      </Form>
    </div>
  )
}
