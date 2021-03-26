import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toggle from '../Toggle';

interface IOwnProps {
    title: string;
    buttons?: {
        label: string;
        value: string;
    }[];
    selected?: string;
    onToggleChange?: (value: string) => void;
}

// const useStyles = makeStyles((theme) => ({}));

const Header: React.FC<IOwnProps> = ({
    title,
    buttons = [],
    selected = '',
    onToggleChange = () => {}
}) => {
    // const classes = useStyles();
    // const renders = React.useRef(0);

    return (
        <>
            {/* {renders.current++} */}
            {buttons.length ? (
                <>
                    <Typography variant="h5" style={{ fontWeight: 600, marginRight: 16 }}>
                        {title}
                    </Typography>
                    <Toggle buttons={buttons} selected={selected} onToggleChange={onToggleChange} />
                </>
            ) : (
                <Typography variant="h5" style={{ fontWeight: 600 }}>
                    {title}
                </Typography>
            )}
        </>
    );
};

export default React.memo(Header);
