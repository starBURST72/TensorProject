import "./SettingsPage.css";
import React, { useContext, useEffect, useState } from 'react';
import { Button, DatePicker, Form, Select, Space, Typography } from 'antd';
import type { DatePickerProps } from 'antd';
import SettingsInput from "../../components/SettingsInput/SettingsInput";
import { getProfileSettings, putProfileSettings } from "../../services/UserProfileService";
import dayjs from 'dayjs';
import SettingsAvatarInput from "../../components/SettingsAvatarInput/SettingsAvatarInput";
import { Context } from "../..";

const interests = [
  'спорт', 'концерты', 'кино', 'выставки', 'кафе', 'рестораны', 'театр', 'парк', 'музей',
];

const options = interests.map((interest, index) => ({
  label: interest,
  value: index+1 
}));

const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

type UserInfoFields = {
  file: string | null;
  name: string;
  surname: string;
  gender: string;
  birthday: string;
  email: string;
  username: string;
  city: string;
  interests: number[];
};

const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

function SettingsPage() {
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [userSettingsInfoRes, setUserSettingsInfoRes] = useState<UserInfoFields | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const { store } = useContext(Context);
  const handleChange = (value: number[]) => {
    console.log(`selected ${value}`);
    console.log(userSettingsInfoRes);
  };

  const [form] = Form.useForm();

  useEffect(() => {
    const onRender = async () => {
      try {
        const responseUserSettingsInfo = await getProfileSettings();
        if (responseUserSettingsInfo.file) {
          setUserSettingsInfoRes(responseUserSettingsInfo);
          setSelectedFile(responseUserSettingsInfo.file as string);
        } else {
          setUserSettingsInfoRes(responseUserSettingsInfo);
        }
        console.log(responseUserSettingsInfo);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    onRender();
  }, []);

  useEffect(() => {
    if (userSettingsInfoRes) {
      form.setFieldsValue({
        file: userSettingsInfoRes.file ?? '',
        name: userSettingsInfoRes.name ?? '',
        surname: userSettingsInfoRes.surname ?? '',
        gender: userSettingsInfoRes.gender ?? '',
        birthday: userSettingsInfoRes.birthday ? dayjs(userSettingsInfoRes.birthday, 'YYYY-MM-DD') : null,
        email: userSettingsInfoRes.email ?? '',
        username: userSettingsInfoRes.username ?? '',
        city: userSettingsInfoRes.city ?? '',
        interests: userSettingsInfoRes.interests ?? [],
      });
    }
  }, [userSettingsInfoRes, form]);

  const onFinish = async (settings: {
    file: string | null;
    name: string;
    surname: string;
    gender: string;
    birthday: string;
    email: string;
    username: string;
    city: string;
    interests: number[];
  }) => {
    try {
      console.log(settings);
      settings.birthday = dayjs(settings.birthday).format('YYYY-MM-DD');
      await putProfileSettings(settings);
      console.log('Настройки изменены', settings);
    } catch (error) {
      console.error('Ошибка при изменении настроек:', error);
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-avataravatar"></div>
      <Typography.Title level={4} className="settings-header">Ваши данные</Typography.Title>
      <div>
        <Form
          form={form}
          onFinish={onFinish}
          className="settings-form"
          name="settingsForm"
          style={{ maxWidth: 500 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <SettingsAvatarInput
            key='file'
            name='file'
            id='file'
            file={selectedFile}
            onAvatarLoad={() => setAvatarLoaded(true)}
            onFileChange={async (file) => {
              if (file) {
                const base64 = await getBase64(file);
                setSelectedFile(base64);
                form.setFieldsValue({ file: base64 }); 
              } else {
                setSelectedFile(null);
                form.setFieldsValue({ file: null }); 
              }
            }}
          />
          <Space.Compact style={{ width: '100%' }} size='middle' direction='horizontal' className="topform">
            <Space.Compact style={{ width: '49%' }} size='middle' direction='vertical'>
              <SettingsInput
                title='Имя'
                classNameFormItemInput='settingsFormItemInput'
                key='name'
                name='name'
                id='name'
                placeholder='Имя'
                classNameSpace='settingsSpace'
                rules={[{}]}
              />
              <Typography.Title level={5}>Пол</Typography.Title>
              <Form.Item
                className="settingsInput"
                key='gender'
                name="gender"
                id='gender'
              >
                <Select
                  placeholder="Пол"
                  onChange={handleChange}
                  options={[
                    { value: 'Мужской', label: 'Мужской' },
                    { value: 'Женский', label: 'Женский' },
                  ]}
                />
              </Form.Item>
            </Space.Compact>
            <Space.Compact style={{ width: '49%' }} size='middle' direction='vertical'>
              <SettingsInput
                title="Фамилия"
                classNameFormItemInput='settingsFormItemInput'
                key='surname'
                name='surname'
                id='surname'
                placeholder='Фамилия'
                classNameSpace='settingsSpace'
                rules={[{}]}
              />
              <Typography.Title level={5}>Дата рождения</Typography.Title>
              <Form.Item
                key='birthday'
                name="birthday"
                id='birthday'
              >
                <DatePicker format={'YYYY-MM-DD'} onChange={onChangeDate} style={{ width: '100%' }} />
              </Form.Item>
            </Space.Compact>
          </Space.Compact>
          <SettingsInput
            title="Почта"
            classNameFormItemInput='settingsFormItemInput'
            key='email'
            name='email'
            id='email'
            placeholder='Почта'
            classNameSpace='settingsSpace'
            rules={[{
              type: 'email',
              message: 'Некорректный email!',
            }]}
          />
          <SettingsInput
            title="Логин"
            classNameFormItemInput='settingsFormItemInput'
            key='username'
            name='username'
            id='username'
            placeholder='Логин'
            classNameSpace='settingsSpace'
            rules={[{}]}
          />
          <SettingsInput
            title="Город"
            classNameFormItemInput='settingsFormItemInput'
            key='city'
            name='city'
            id='city'
            placeholder='Город'
            classNameSpace='settingsSpace'
            rules={[{}]}
          />
          <Space.Compact style={{ width: '100%' }} size='middle' direction='vertical'>
            <Typography.Title level={5}>Интересы</Typography.Title>
            <Form.Item
              style={{ width: '100%' }}
              key='interests'
              name="interests"
              id='interests'
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Выберите интересующие места"
                onChange={handleChange}
                options={options}
                listHeight={150}
                maxCount={3}
              />
            </Form.Item>
          </Space.Compact>
          <Button style={{ backgroundColor: '#5c62ec', alignSelf: 'center' }} type="primary" htmlType="submit">Изменить</Button>
        </Form>
      </div>
    </div>
  );
}

export default SettingsPage;
