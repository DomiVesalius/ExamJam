import { createContext, useContext } from 'react';

export type MainContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated: (v: boolean) => void;
};

export const MainContext = createContext<MainContextType>({
    isAuthenticated: false,
    setIsAuthenticated: (v: boolean) => {}
});

export const useMainContext = () => useContext(MainContext);
