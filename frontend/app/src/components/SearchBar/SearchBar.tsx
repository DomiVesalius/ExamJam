import React, { KeyboardEventHandler, MouseEventHandler } from 'react';
import { alpha, InputBase, styled, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchProps {
    /** Color of Search Bar when hovering */
    hoverColor: string;

    /** Color of Search Bar (default) */
    defaultColor: string;

    /** Placeholder text in search */
    placeHolder: string;

    /** Optional function to handle key press for search bar */
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
    handleKeyPress
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
        width: '60%'
    }));

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder={placeHolder} onKeyPress={handleKeyPress} />
            </Search>
            <div onClick={() => handleKeyPress}>
                <Button
                    variant="outlined"
                    size="medium"
                    sx={{
                        ml: -1
                    }}
                >
                    Search
                </Button>
            </div>
        </Box>
    );
};
