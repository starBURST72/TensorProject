import React, { useContext, useState } from 'react'
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import './Auth.css';
import { Context } from '../../components/Context/AppContext';
import { postLogin,postRegister} from "../../API/API";

type LoginFields = {
  username: string;
  password: string;
  remember:boolean;
};
type RegisterFields = {
  email: string;
  username: string;
  password: string;
  VerifyPass: string;
};
const onFinish: FormProps<LoginFields>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<LoginFields>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


export default function Auth() {
  const {setAuth} = useContext(Context);

  const [isAuthForm, setIsAuthForm ] = useState(false);

  const onFinish = async (values: LoginFields | RegisterFields) => {
    try {
      if ('email' in values) { // Проверяем наличие свойства email
        // Если email есть, значит это форма регистрации
        const response = await postRegister({
          email: values.email,
          username: values.username,
          password: values.password,
        });
        console.log('Registration successful:', response.data);
      } else {
        // Если email отсутствует, значит это форма входа
        const response = await postLogin({
          username: values.username,
          password: values.password,
        });
        const token = response.data.token;
        setAuth(true);
        localStorage.setItem('auth', 'true');
        localStorage.setItem('token', token);
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



        {isAuthForm ?
            <>
            <Form.Item<LoginFields>
                label="Логин"
                key={'username'}
                name="username"
                id='login'
                rules={[{ required: true, message: 'Введите логин' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<LoginFields>

                label="Пароль"
                name={'password'}
                key={'password'}
                id='password'
                rules={[{ required: true, message: 'Введите пароль' }]}
            >
              <Input.Password />
            </Form.Item>
              <Form.Item<LoginFields>
                  name="remember"
                  valuePropName="checked"
                  style={{ alignSelf: 'center' }}
              >
                <Checkbox>Запомнить меня</Checkbox>
              </Form.Item>
            </>
            :
            <>
                <Form.Item<RegisterFields>
                  label="Почта"
                  key={'email'}
                  name="email"
                  id='email'
                  rules={[{ required: true, message: 'Введите почту' }]}
                >
                  <Input />
                </Form.Item>
                    <Form.Item<RegisterFields>
                        label="Логин"
                        key={'username'}
                        name="username"
                        id='login'
                        rules={[{ required: true, message: 'Введите логин' }]}
                    >
                      <Input />
                    </Form.Item>
                <Form.Item<RegisterFields>

                label="Пароль"
                name="password"
                key={'password'}
              id='password'
              rules={[{ required: true, message: 'Введите пароль' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item<RegisterFields>
                className="form-item-label"
                label="Повторите пароль"
                id='VerifyPass'
                key={'VerifyPass'}
                rules={[{ required: true, message: 'Введите пароль' }]}

            >
              <Input.Password />
            </Form.Item>

          </>
        }

        <Form.Item style={{ alignSelf: 'center' }}>
          <Button type="primary" htmlType="submit">
            {isAuthForm ? 'Войти' : 'Регистрация'}
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
