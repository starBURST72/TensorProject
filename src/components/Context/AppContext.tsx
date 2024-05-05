import React, { createContext } from 'react';

interface AppContextType {
    isAuth: boolean;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialContext: AppContextType = {
    isAuth: false,
    setAuth: () => {},
};

export const Context = createContext<AppContextType>(initialContext);
