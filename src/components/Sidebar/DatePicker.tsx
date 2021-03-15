import React from 'react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

interface IOwnProps {
    value: any;
    onChange: (date: any) => void;
    maxDate?: any;
    minDate?: any;
}

const DatePicker: React.FC<IOwnProps> = ({ value, onChange, maxDate, minDate }) => {
    const renders = React.useRef(0);
    return (
        <>
            {/* {renders.current++} */}
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                    // id="start-release-date"
                    inputVariant="filled"
                    margin="normal"
                    label="From"
                    format="MM/DD/yyyy"
                    value={value}
                    onChange={(date: any) => {
                        onChange(date ? moment(date).format('YYYY-MM-DD') : null);
                    }}
                    KeyboardButtonProps={{ 'aria-label': 'change date' }}
                    InputProps={{ disableUnderline: true }}
                    maxDate={maxDate ? new Date(maxDate) : new Date('2100-01-01')}
                    minDate={minDate ? new Date(minDate) : new Date('1900-01-01')}
                />
            </MuiPickersUtilsProvider>
        </>
    );
};

export default DatePicker;
