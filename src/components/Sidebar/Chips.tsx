import React, { ReactNode } from 'react';
import Box from '@material-ui/core/Box';
// import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';

import Chip from './Chip';
import Typography from '@material-ui/core/Typography';

interface IOwnProps {
    label: string;
    chipRender: (item: any) => ReactNode;
    // onChipClick: (value: string) => void;
    // onChipSelected: (value: string) => boolean;
    // value: string;
    // onChange?: (
    //     event: React.ChangeEvent<{
    //         name?: string | undefined;
    //         value: unknown;
    //     }>,
    //     child: React.ReactNode
    // ) => void;
    options: {
        [key: string]: string;
    };
}

const Chips: React.FC<IOwnProps> = ({
    label,
    chipRender,
    // onChipClick,
    // onChipSelected,
    options
    //  value, onChange, options
}) => {
    const renders = React.useRef(0);

    // React.useEffect(() => {
    //     console.log('label');
    // }, [label]);

    // React.useEffect(() => {
    //     console.log('options');
    // }, [options]);

    // React.useEffect(() => {
    //     console.log('chipRender');
    // }, [chipRender]);

    // React.useEffect(() => {
    //     console.log('onChipSelected');
    // }, [onChipSelected]);

    return (
        <>
            <Box display="flex" flexDirection="column" p={2}>
                <Typography style={{ marginBottom: 8 }}>
                    {label} {renders.current++}
                </Typography>
                <Box display="flex" flexWrap="wrap">
                    {Object.entries(options).map(
                        (item) => chipRender(item)
                        // (
                        // <Chip
                        //     key={key}
                        //     label={value}
                        //     onClick={() => onChipClick(value)}
                        //     variant={onChipSelected(value) ? 'default' : 'outlined'}
                        //     size="small"
                        //     style={{ margin: 4 }}
                        // />
                        // <Chip
                        //     label={value}
                        //     onClick={() => onChipClick(value)}
                        //     isSelected={onChipSelected(value)}
                        // />
                        // <></>
                        // )
                    )}
                </Box>
            </Box>

            <Divider />
        </>
    );
};

export default React.memo(Chips);
