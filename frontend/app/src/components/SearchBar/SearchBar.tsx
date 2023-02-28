import React, { KeyboardEventHandler } from 'react';
import { alpha, createTheme, InputBase, styled, Autocomplete, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchProps {
    /** Color of Search Bar when hovering */
    hoverColor: string;

    /** Color of Search Bar (default) */
    defaultColor: string;

    /** Placeholder text in search */
    placeHolder: string;

    handleKeyPress?: KeyboardEventHandler<HTMLDivElement>;
}

/** styled('div') creates custom divs with start and end tag of the constant name */

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

export const SearchBar = ({
    hoverColor,
    defaultColor,
    placeHolder,
    handleKeyPress,
    ...props
}: SearchProps) => {
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch'
            }
        }
    }));

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(defaultColor ? defaultColor : theme.palette.primary.main, 0.15),
        '&:hover': {
            backgroundColor: alpha(hoverColor ? hoverColor : theme.palette.primary.main, 0.25)
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto'
        }
    }));

    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 }
    ];

    return (
        <Autocomplete
            renderInput={(params) => {
                const { InputLabelProps, InputProps, ...rest } = params;
                return (
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            {...params.InputProps}
                            {...rest}
                            placeholder={placeHolder}
                            onKeyPress={handleKeyPress}
                        />
                    </Search>
                );
            }}
            options={top100Films}
            getOptionLabel={(option) => option.title}
        />
    );
};
