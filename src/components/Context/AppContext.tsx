import React, { createContext } from 'react';

interface AppContextType {
    isAuth: boolean;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialContext: AppContextType = {
    isAuth: false,
    setAuth: () => { },
};

export const Context = createContext<AppContextType>(initialContext);




interface TravelContextType {
    travel: {
        title: string;
        description: string;
        id: number
    };
    setTravel: React.Dispatch<React.SetStateAction<any>>;
}

const initialContextTravel: TravelContextType = {
    travel: {
        title: 'Выберите маршрут',
        description: 'Описание',
        id: 0
    },
    setTravel: () => { },
};

export const ContextTravel = createContext<TravelContextType>(initialContextTravel);
