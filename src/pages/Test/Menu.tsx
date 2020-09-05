import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        paper: {
            marginRight: theme.spacing(2)
        }
    })
);

export default function MenuListComposition() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [isPointerOnMenu, setIsPointerOnMenu] = React.useState(false);

    const pointerRef = React.useRef(isPointerOnMenu);
    pointerRef.current = isPointerOnMenu;

    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handlePopoverOpen = () => {
        // setOpen((prevOpen) => !prevOpen);
        setOpen(true);
    };

    const handleTriggerPointerLeave = () => {
        // setIsPointerOnMenu(false);
        setTimeout(() => {
            if (pointerRef.current) {
                console.log('no close');
                return;
            }
            setOpen(false);
        }, 100);
        // setOpen(false);
    };

    const handleMenuPointerEnter = () => {
        setIsPointerOnMenu(true);
    };

    const handleMenuPointerLeave = () => {
        setIsPointerOnMenu(false);
        setOpen(false);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    // function handleListKeyDown(event: React.KeyboardEvent) {
    //     if (event.key === 'Tab') {
    //         event.preventDefault();
    //         setOpen(false);
    //     }
    // }

    // return focus to the button when we transitioned from !open -> open
    // const prevOpen = React.useRef(open);
    // React.useEffect(() => {
    //     if (prevOpen.current === true && open === false) {
    //         anchorRef.current!.focus();
    //     }

    //     prevOpen.current = open;
    // }, [open]);

    return (
        <div className={classes.root}>
            {/* <Paper className={classes.paper}>
                <MenuList>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>My account</MenuItem>
                    <MenuItem>Logout</MenuItem>
                </MenuList>
            </Paper> */}
            <div>
                <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    // onClick={handlePopoverOpen}
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handleTriggerPointerLeave}
                >
                    Toggle Menu Grow
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
                                transformOrigin:
                                    placement === 'bottom' ? 'center top' : 'center bottom'
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="menu-list-grow"
                                        // onKeyDown={handleListKeyDown}
                                    >
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}
