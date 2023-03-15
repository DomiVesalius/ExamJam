import { createContext, useContext } from 'react';

export type MainContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated: (v: boolean) => void;
    currUser: string;
    setCurrUser: (s: string) => void;
};

export const MainContext = createContext<MainContextType>({
    isAuthenticated: false,
    setIsAuthenticated: (v: boolean) => {},
    currUser: '',
    setCurrUser: (s: string) => {}
});

export const useMainContext = () => useContext(MainContext);
