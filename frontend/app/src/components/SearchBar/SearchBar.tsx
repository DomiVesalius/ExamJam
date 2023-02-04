import React from 'react';
import { alpha, createTheme, InputBase, styled } from '@mui/material';

interface SearchProps {
    /** Color of Search Bar when hovering */
    hoverColor: string;

    /** Color of Search Bar (default) */
    defaultColor: string;

    /** Placeholder text in search */
    placeHolder: string;
}

/* styled('div') creates custom divs with start and end tag of the constant name */

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export const SearchBar = ({
    hoverColor,
    defaultColor,
    placeHolder,
    ...props
}: SearchProps) => {
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(defaultColor ? defaultColor : theme.palette.primary.main, 0.15),
        '&:hover': {
            backgroundColor: alpha(hoverColor ? hoverColor : theme.palette.primary.main, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));
    return (
        <Search>
            {/*<SearchIconWrapper>*/}
            {/*    <SearchIcon />*/}
            {/*</SearchIconWrapper>*/}
            <StyledInputBase
                placeholder={placeHolder}
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    );
};