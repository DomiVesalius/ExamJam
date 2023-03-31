import React from 'react';
import { AppBar, Box, Button, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { AccountCircle } from '@mui/icons-material';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useMainContext } from '../../contexts/Main/MainContext';
import LogoutButton from '../Auth/LogoutButton/LogoutButton';
import PathConstants from '../../utils/pathConstants';
import NavbarLink from './NavbarLink/NavbarLink';
import { ToggleThemeButton } from '../ToggleThemeButton/ToggleThemeButton';

interface NavbarProps {
    /** User menu when account icon is clicked */
    userMenu1: string;

    /** User menu when account icon is clicked */
    userMenu2: string;

    /** Name of the Navbar */
    navbarName: string;

    /** Default color of search bar */
    searchDefaultColor: string;

    /** Hover color of search bar */
    searchHoverColor: string;

    /** Placeholder for search bar */
    searchPlaceholder: string;

    /** Color of app bar */
    appbarColor?: 'inherit' | 'transparent' | 'default' | 'primary' | 'secondary' | undefined;
}

export const Navbar = ({
    userMenu1,
    userMenu2,
    navbarName,
    searchDefaultColor,
    searchHoverColor,
    searchPlaceholder,
    appbarColor,
    ...props
}: NavbarProps) => {
    const { isAuthenticated } = useMainContext();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: object) => {
        // @ts-ignore
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: object) => {
        // @ts-ignore
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <NavbarLink to={PathConstants.profilePage}>My Profile</NavbarLink>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <LogoutButton />
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color={appbarColor} position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <NavbarLink
                        to={isAuthenticated ? PathConstants.dashboard : PathConstants.rootPage}
                    >
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            ExamJam
                        </Typography>
                    </NavbarLink>
                    {/* Search Bar from SearchBar.tsx */}

                    <Box sx={{ flexGrow: 1 }} />
                    {isAuthenticated && (
                        <NavbarLink to={PathConstants.courseSearch}>
                            <IconButton color="inherit">
                                <SearchIcon />
                            </IconButton>
                        </NavbarLink>
                    )}

                    <ToggleThemeButton />

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {isAuthenticated && (
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        )}
                        {!isAuthenticated && (
                            <div>
                                <Button sx={{ color: 'white' }}>
                                    <NavbarLink to={PathConstants.loginPage}>Login</NavbarLink>
                                </Button>
                                <Button sx={{ color: 'white' }}>
                                    <NavbarLink to={PathConstants.registerPage}>
                                        Register
                                    </NavbarLink>
                                </Button>
                            </div>
                        )}
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
};
