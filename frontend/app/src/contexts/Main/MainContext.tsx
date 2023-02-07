import { createContext, useContext } from 'react';

export type MainContext = {
    isAuthenticated: boolean;
    setIsAuthenticated: (v: boolean) => void;
};

export const MainContext = createContext<MainContext>({
    isAuthenticated: false,
    setIsAuthenticated: (v: boolean) => {}
});

export const useMainContext = () => useContext(MainContext);
