import React, { ReactNode } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

interface IOwnProps {
    label: string;
    children: ReactNode;
}

const DateRangePicker: React.FC<IOwnProps> = ({ label, children }) => {
    const renders = React.useRef(0);

    return (
        <>
            <Box display="flex" flexDirection="column" p={2}>
                <Typography>{label}</Typography>

                {children}
                {/* <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                        id="start-release-date"
                        inputVariant="filled"
                        margin="normal"
                        label="From"
                        format="MM/DD/yyyy"
                        value={releaseStartDate}
                        onChange={(date: any) => {
                            setReleaseStartDate(date ? moment(date).format('YYYY-MM-DD') : null);
                        }}
                        KeyboardButtonProps={{ 'aria-label': 'change date' }}
                        InputProps={{ disableUnderline: true }}
                        maxDate={releaseEndDate ? new Date(releaseEndDate) : new Date('2100-01-01')}
                    />
                </MuiPickersUtilsProvider>

                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                        id="end-release-date"
                        inputVariant="filled"
                        margin="normal"
                        label="To"
                        format="MM/DD/yyyy"
                        value={releaseEndDate}
                        onChange={(date: any) => {
                            setReleaseEndDate(date ? moment(date).format('YYYY-MM-DD') : null);
                        }}
                        KeyboardButtonProps={{ 'aria-label': 'change date' }}
                        InputProps={{ disableUnderline: true }}
                        minDate={
                            releaseStartDate ? new Date(releaseStartDate) : new Date('1900-01-01')
                        }
                    />
                </MuiPickersUtilsProvider> */}
            </Box>

            <Divider />
        </>
    );
};

export default DateRangePicker;
// export default React.memo(DateRangePicker);
