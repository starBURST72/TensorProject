// ElementsList.ts
import { useContext } from 'react';
import { Context } from '../Context/AppContext';

const elements = [
    {
        name: 'Главная',
        order: 0,
        link: '/',
    },
    {
        name: 'Карта',
        order: 1,
        link: '/map',
    },
    {
        name: 'Авторизация',
        order: 2,
        link: '/auth',
    },
];

export function ElementsList() {
    // const { signedIn } = useContext(Context);
    //
    // // Проверяем, вошел ли пользователь в систему, чтобы решить, нужно ли включать последний элемент
    // const filteredElements = signedIn ? elements.slice(0, -1) : elements;

    // Возвращаем отфильтрованный массив элементов
    return elements;
}
