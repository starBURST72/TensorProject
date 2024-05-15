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

interface Travel {
    title: string;
    description: string;
    id: number;
}

interface TravelContextType {
    travels: Travel[];
    selectedTravel: Travel | null;
    setTravels: React.Dispatch<React.SetStateAction<Travel[]>>;
    setSelectedTravel: React.Dispatch<React.SetStateAction<Travel | null>>;
}
const initialContextTravel: TravelContextType = {
    travels: [],
    selectedTravel: null,
    setTravels: () => { },
    setSelectedTravel: () => { },
};


export const ContextTravel = createContext<TravelContextType>(initialContextTravel);
