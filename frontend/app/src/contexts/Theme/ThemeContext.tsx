import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ColorModeContext } from '../../components/ToggleThemeButton/ToggleThemeButton';
import CssBaseline from '@mui/material/CssBaseline';
interface ThemeContextProps {
    children?: React.ReactNode;
}
export const ThemeContext: React.FunctionComponent<ThemeContextProps> = (props) => {
    const storage = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    const [storageTheme, setStorageTheme] = React.useState(storage);

    const [mode, setMode] = React.useState<'light' | 'dark'>(storage);
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            }
        }),
        []
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode
                }
            }),
        [mode]
    );

    useEffect(() => {
        localStorage.setItem('theme', mode);
        setStorageTheme(mode);
    }, [theme, storageTheme, mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {props.children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};
