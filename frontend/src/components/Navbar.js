import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { BR } from 'country-flag-icons/react/3x2'
import NavbarButton from './NavbarButton/NavbarButton';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const navButtons = ['shop', 'study', 'cards', 'stats', 'settings']

const ResponsiveAppBar = ({ activePage, setActivePage }) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar
            position="fixed"
            style={{
                borderColor: '#EDEDED',
                borderStyle: 'solid',
                borderWidth: '1px 0px 3px 0px',
                background: '#ffd447',
                boxShadow: 'none'
            }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <div>
                        <div className='nav-bar-menu-button'>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon style={{ color: '#4772FF' }} />
                            </IconButton>
                        </div>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}>
                            {navButtons.map((navButtonName) =>
                                <NavbarButton
                                    activePage={activePage}
                                    animation={navButtonName}
                                    label={navButtonName.toUpperCase()}
                                    onClick={setActivePage}
                                />)}
                        </Menu>
                    </div>
                    <div className='nav-bar-items'>
                        {navButtons.map((navButtonName) =>
                            <NavbarButton
                                activePage={activePage}
                                animation={navButtonName}
                                label={navButtonName.toUpperCase()}
                                onClick={setActivePage}
                            />)}
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                    <Tooltip title="Change language">
                        <div className='language-flag'>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <BR title="Brazil" className="country-flag" />
                            </IconButton>
                        </div>
                    </Tooltip>
                </Toolbar>
            </Container>
        </AppBar >
    );
};
export default ResponsiveAppBar;
