import { createContext } from 'react';

interface AppContextType {
    signedIn: boolean;
    setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialContext: AppContextType = {
    signedIn: false,
    setSignedIn: () => {},
};

export const Context = createContext<AppContextType>(initialContext);
