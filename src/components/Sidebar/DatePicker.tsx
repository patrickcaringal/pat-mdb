import React, { ReactNode } from 'react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

interface IOwnProps {
    value: any;
    onChange?: (date: any) => void;
}

const DatePicker: React.FC<IOwnProps> = ({ value, onChange }) => {
    const renders = React.useRef(0);

    React.useEffect(() => {
        console.log('onChange');
    }, [onChange]);

    React.useEffect(() => {
        console.log('value');
    }, [value]);

    return (
        <>
            {renders.current++}
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                    // id="start-release-date"
                    inputVariant="filled"
                    margin="normal"
                    label="From"
                    format="MM/DD/yyyy"
                    value={value}
                    onChange={(date: any) => {
                        // setReleaseStartDate(date ? moment(date).format('YYYY-MM-DD') : null);
                        // onChange(date ? moment(date).format('YYYY-MM-DD') : null);
                    }}
                    KeyboardButtonProps={{ 'aria-label': 'change date' }}
                    InputProps={{ disableUnderline: true }}
                    maxDate={new Date('2100-01-01')}
                    // maxDate={releaseEndDate ? new Date(releaseEndDate) : new Date('2100-01-01')}
                />
            </MuiPickersUtilsProvider>
        </>
    );
};

// export default DatePicker;
export default React.memo(DatePicker);
