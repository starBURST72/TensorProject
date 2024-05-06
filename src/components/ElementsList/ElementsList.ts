// ElementsList.ts
import { useContext } from 'react';
import { Context } from '../Context/AppContext';

const elements = [
    {
        name: 'Главная',
        key: 0,
        link: '/',
    },
    {
        name: 'Карта',
        key: 1,
        link: '/map',
    },
    {
        name: 'Мои маршруты',
        key: 2,
        link: '/travels',
    },
    {
        name: 'Авторизация',
        key: 3,
        link: '/auth',
    },


];

export function ElementsList() {
    // const { signedIn } = useContext(Context);

    // const filteredElements = signedIn ? elements.slice(0, -1) : elements;

    // Возвращаем отфильтрованный массив элементов
    return elements;
}
