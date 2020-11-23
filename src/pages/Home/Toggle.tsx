import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles((theme) => ({
    toggleButton: {
        '&.MuiToggleButton-root': {
            padding: 5,
            minWidth: 60,
            textTransform: 'none'
        },
        '&.Mui-selected': {
            background: theme.palette.primary.main,
            color: theme.palette.common.white,
            '&:hover': {
                background: theme.palette.primary.dark
            }
        }
    }
}));

interface IToggle {
    buttons: {
        label: string;
        value: string;
    }[];
    selected: string;
    onToggleChange: (value: string) => void;
}

const Toggle: React.FC<IToggle> = ({ buttons, selected, onToggleChange }) => {
    const classes = useStyles();

    const handleToggle = (event: any, value: string) => {
        if (value) onToggleChange(value);
    };

    return (
        <ToggleButtonGroup value={selected} size="small" exclusive onChange={handleToggle}>
            {buttons.map((b) => (
                <ToggleButton className={classes.toggleButton} value={b.value}>
                    {b.label}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
};

export default Toggle;
