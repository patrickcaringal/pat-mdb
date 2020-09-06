import React, { useEffect, useState, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

const useStyles = makeStyles((theme) => ({
    button: {
        '&:hover': {
            background: 'none'
        },
        width: 125
    },
    selected: {
        fontWeight: 'bold'
    }
}));

export interface TabMenuProps {
    label: string;
    options?: { label: string; linkTo: string }[];
}

const TabMenu: React.FC<TabMenuProps> = ({ label, options = [], ...rest }) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [isPointerOnMenu, setIsPointerOnMenu] = React.useState(false);

    const anchorRef = useRef(null);
    const pointerRef = React.useRef(isPointerOnMenu);
    pointerRef.current = isPointerOnMenu;

    const handlePopoverOpen = () => {
        setOpen(true);
    };

    const handleTriggerPointerLeave = () => {
        setTimeout(() => {
            if (pointerRef.current) {
                return;
            }
            setOpen(false);
        }, 100);
    };

    const handleMenuPointerEnter = () => {
        setIsPointerOnMenu(true);
    };

    const handleMenuPointerLeave = () => {
        setIsPointerOnMenu(false);
        setOpen(false);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        setOpen(false);
    };

    return (
        <>
            <Button
                className={classes.button}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
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
                open={open}
                anchorEl={anchorRef.current}
                transition
                disablePortal
                onMouseEnter={handleMenuPointerEnter}
                onMouseLeave={handleMenuPointerLeave}
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
                                <MenuList autoFocusItem={open} id="menu-list-grow">
                                    {options.map((i) => (
                                        <MenuItem onClick={handleClose} style={{ width: 150 }}>
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

export default TabMenu;
