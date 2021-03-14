import React, { ReactNode } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

interface IOwnProps {
    label: string;
    children?: ReactNode;
}

const DateRangePicker: React.FC<IOwnProps> = ({ label, children }) => {
    const renders = React.useRef(0);

    // React.useEffect(() => {
    //     console.log('label');
    // }, [label]);

    // React.useEffect(() => {
    //     console.log('children');
    //     console.log(children);
    // }, [children]);

    return (
        <>
            <Box display="flex" flexDirection="column" p={2}>
                <Typography>
                    {label} {renders.current++}
                </Typography>

                {children}
            </Box>

            <Divider />
        </>
    );
};

// export default DateRangePicker;
export default React.memo(DateRangePicker);
