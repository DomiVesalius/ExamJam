import React, { useEffect, useState } from 'react';
import { MainContext } from './MainContext';

interface MainContextProviderProps {
    children?: React.ReactNode;
}

const MainContextProvider: React.FunctionComponent<MainContextProviderProps> = (props) => {
    useEffect(() => {
        if (localStorage.getItem('auth') === null)
            localStorage.setItem('auth', JSON.stringify(false));
        if (localStorage.getItem('email') === null)
            localStorage.setItem('email', JSON.stringify(false));
    }, []);

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        JSON.parse(localStorage.getItem('auth') || 'false')
    );

    const [currUser, setCurrUser] = useState<string>(
        JSON.parse(localStorage.getItem('email') || 'false')
    );

    const setUser = (email: string) => {
        setCurrUser(email);
        localStorage.setItem('email', JSON.stringify(email));
    };

    const setAuth = (value: boolean) => {
        setIsAuthenticated(value);
        localStorage.setItem('auth', JSON.stringify(value));
    };

    return (
        <MainContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated: setAuth,
                setCurrUser: setUser,
                currUser
            }}
        >
            {props.children}
        </MainContext.Provider>
    );
};

export default MainContextProvider;
