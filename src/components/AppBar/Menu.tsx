import React, { useState, useRef } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

const useStyles = makeStyles((theme) => ({
    menu: {
        '&:hover': {
            background: 'none'
        },
        width: 150,
        color: '#fff',
        fontWeight: ({ menuSelected }: { menuSelected: boolean }) =>
            menuSelected ? 'bold' : 'normal'
    },
    menuItemCont: {
        marginLeft: 100
    }
}));

export interface MenuProps extends RouteComponentProps {
    label: string;
    value: string;
    options?: { label: string; linkTo: string }[];
}

const Menu: React.FC<MenuProps> = ({ label, value, options = [], location, ...rest }) => {
    const classes = useStyles({ menuSelected: location.pathname.includes(`/${value}/`) });

    const [isMenuItemsOpen, setIsMenuItemsOpen] = useState<boolean>(false);
    const [isPointerOnMenuItems, setIsPointerOnMenuItems] = useState<boolean>(false);

    const anchorRef = useRef(null);
    const pointerRef = useRef(isPointerOnMenuItems);
    pointerRef.current = isPointerOnMenuItems;

    const handlePopoverOpen = () => {
        setIsMenuItemsOpen(true);
    };

    const handleTriggerPointerLeave = () => {
        setTimeout(() => {
            if (pointerRef.current) {
                return;
            }
            setIsMenuItemsOpen(false);
        }, 100);
    };

    const handleMenuPointerEnter = () => {
        setIsPointerOnMenuItems(true);
    };

    const handleMenuPointerLeave = () => {
        setIsPointerOnMenuItems(false);
        setIsMenuItemsOpen(false);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        setIsMenuItemsOpen(false);
    };

    return (
        <>
            <Button
                className={classes.menu}
                ref={anchorRef}
                aria-controls={isMenuItemsOpen ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                disableRipple
                disableFocusRipple
                onClick={handlePopoverOpen}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handleTriggerPointerLeave}
                {...rest}
            >
                {label}
            </Button>
            <Popper
                open={isMenuItemsOpen}
                anchorEl={anchorRef.current}
                transition
                disablePortal
                onMouseEnter={handleMenuPointerEnter}
                onMouseLeave={handleMenuPointerLeave}
                className={classes.menuItemCont}
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="menu-list-grow">
                                    {options.map((i) => (
                                        <MenuItem
                                            component={Link}
                                            to={i.linkTo}
                                            onClick={handleClose}
                                            style={{ width: 150 }}
                                            selected={location.pathname.includes(i.linkTo)}
                                        >
                                            {i.label}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

export default withRouter(Menu);
