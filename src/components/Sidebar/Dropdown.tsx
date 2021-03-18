import React from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';

interface IOwnProps {
    label: string;
    value: string;
    onChange?: (
        event: React.ChangeEvent<{
            name?: string | undefined;
            value: unknown;
        }>,
        child: React.ReactNode
    ) => void;
    options: {
        [key: string]: string;
    };
}

const Dropdown: React.FC<IOwnProps> = ({ label, value, onChange, options }) => {
    const renders = React.useRef(0);

    return (
        <>
            <Box display="flex" flexDirection="column" p={2}>
                <FormControl variant="filled">
                    <InputLabel id="sort-select">
                        {label}
                        {renders.current++}
                    </InputLabel>
                    <Select
                        labelId="sort-select"
                        id="demo-simple-select"
                        value={value}
                        onChange={onChange}
                        disableUnderline
                        MenuProps={{
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left'
                            },
                            transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left'
                            },
                            getContentAnchorEl: null
                        }}
                    >
                        {Object.entries(options).map(([key, value]) => (
                            <MenuItem value={key} key={key}>
                                {value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Divider />
        </>
    );
};

export default React.memo(Dropdown);
