import React from 'react';
import Box from '@material-ui/core/Box';
// import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';

import MUIChip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

interface IOwnProps {
    isSelected: boolean;
    label: string;
    onClick: () => void;
}

const Chip: React.FC<IOwnProps> = React.memo(
    ({ isSelected, label, onClick }) => {
        const renders = React.useRef(0);

        // React.useEffect(() => {
        //     console.log('\n\nisSelected');
        // }, [isSelected]);
        // React.useEffect(() => {
        //     console.log('onClick');
        // }, [onClick]);
        // React.useEffect(() => {
        //     console.log('label');
        // }, [label]);

        // React.useEffect(() => {
        //     console.log('isSelected');
        // }, [isSelected]);

        return (
            <MUIChip
                label={`${label} ${renders.current++}`}
                onClick={onClick}
                variant={isSelected ? 'default' : 'outlined'}
                size="small"
                style={{ margin: 4 }}
            />
        );
    },
    (prevProps, nextProps) => {
        return prevProps.isSelected === nextProps.isSelected;
    }
);

// export default Chip;
export default Chip;
