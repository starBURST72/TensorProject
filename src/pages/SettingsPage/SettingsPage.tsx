import "./SettingsPage.css"
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, DatePicker, Form, Select, Space, Typography } from 'antd';
import type { DatePickerProps, SelectProps } from 'antd';
import SettingsInput from "../../components/SettingsInput/SettingsInput";
import { getProfileSettings, getUserProfileInfo, putProfileSettings } from "../../services/UserProfileService";
import dayjs from 'dayjs';
import SettingsAvatarInput from "../../components/SettingsAvatarInput/SettingsAvatarInput";
const interests = [
    'спорт',
    'концерты',
    'кино',
    'выставки',
    'кафе',
    'рестораны',
    'театр',
    'парк',
    'музей',
];

const options: SelectProps['options'] = interests.map(interest => ({
    label: interest,
    value: interest
}));

const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);

};



type UserInfoFields = {
    // message: string,
    // data: {
    ava: string;
    name: string;
    surname: string;
    gender: string;//мб некторые поля здесь не надо, в профиле мы выводим только часть инфы, или можем сделать доп кнопку типа подробнее и там фул инфа
    birthdate: string;//и это
    email: string;//и это
    username: string;
    city: string;
    interests: string[]
    // }
};


function SettingsPage() {
    const [avatarLoaded, setAvatarLoaded] = useState(false);
    const [userSettingsInfoRes, setUserSettingsInfoRes] = useState<UserInfoFields>({
        // message: '',
        // data: {
        ava: '',
        name: 'a',
        surname: 'a',
        gender: '',
        birthdate: '',
        email: '',
        username: '',
        city: '',
        interests: ['']
        // }
    })
    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
        console.log(userSettingsInfoRes)
    };
    useEffect(() => {
        const onRender = async () => {
            try {

                const responseUserSettingsInfo = await getProfileSettings(1)


                setUserSettingsInfoRes(responseUserSettingsInfo)

                console.log(responseUserSettingsInfo)

            } catch (error) {
                console.error('Error:', error);
            }
        };
        onRender()
    }, [])

    useEffect(() => {
        form.setFieldsValue({
            ava: userSettingsInfoRes.ava,
            name: userSettingsInfoRes.name,
            surname: userSettingsInfoRes.surname,
            gender: userSettingsInfoRes.gender,
            birthdate: dayjs(userSettingsInfoRes.birthdate, 'DD.MM.YYYY'),
            email: userSettingsInfoRes.email,
            username: userSettingsInfoRes.username,
            city: userSettingsInfoRes.city,
            interests: userSettingsInfoRes.interests,
        });
    }, [userSettingsInfoRes]);

    const [form] = Form.useForm();
    const onFinish = async (values: UserInfoFields) => {

        try {


            const response = await putProfileSettings(
                1,
                {
                    ava: values.ava,
                    name: values.name,
                    surname: values.surname,
                    gender: values.gender,
                    birthDate: values.birthdate,
                    email: values.email,
                    username: values.username,
                    city: values.city,
                    interests: values.interests,

                });

            console.log('Change settings successful:', response);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="settings-container">
            <div className="settings-avataravatar"></div>
            {/* <h1 className="settings-header">Ваши данные</h1> */}
            <Typography.Title level={4} className="settings-header">Ваши данные</Typography.Title>

            <div >

                {/* мой вариант, но тут чтобы работало, надо в Form оборачивать*/}

                <Form
                    form={form}
                    onFinish={onFinish}
                    className="settings-form"
                    name="settingsForm"
                    style={{ maxWidth: 500 }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"

                >
                    <SettingsAvatarInput
                        key='ava'
                        name='ava'
                        id='ava'
                        ava={userSettingsInfoRes.ava}
                        onAvatarLoad={() => setAvatarLoaded(true)} />
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

                                key='birthdate'
                                name="birthdate"
                                id='birthdate'
                            >
                                <DatePicker format={'DD.MM.YYYY'} onChange={onChangeDate} style={{ width: '100%' }} />

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
                                // defaultValue={userSettingsInfoRes.interests}
                                onChange={handleChange}
                                options={options}
                                listHeight={150}
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