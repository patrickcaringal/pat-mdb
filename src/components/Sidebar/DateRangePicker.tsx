import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import DatePicker from './DatePicker';

interface IOwnProps {
    label: string;
    startDate: any;
    onStartDateChange: (date: any) => void;
    endDate: any;
    onEndDateChange: (date: any) => void;
}

const DateRangePicker: React.FC<IOwnProps> = ({
    label,
    startDate,
    onStartDateChange,
    endDate,
    onEndDateChange
}) => {
    const renders = React.useRef(0);

    return (
        <>
            <Box display="flex" flexDirection="column" p={2}>
                <Typography>
                    {label}
                    {/* {renders.current++} */}
                </Typography>

                <DatePicker value={startDate} onChange={onStartDateChange} maxDate={endDate} />
                <DatePicker value={endDate} onChange={onEndDateChange} minDate={startDate} />
            </Box>

            <Divider />
        </>
    );
};

// export default DateRangePicker;
export default React.memo(DateRangePicker);
