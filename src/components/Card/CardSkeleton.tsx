import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
    cardCont: {
        minWidth: '150px',
        background: 'transparent',
        marginRight: '30px'
    },
    cardImg: {
        height: '225px',
        borderRadius: '8px',
        boxShadow: ({ isHovered }: { isHovered: boolean }) =>
            isHovered ? '0 8px 16px 0 rgba(0,0,0,0.2)' : 'none'
    },
    actionArea: {
        '&:hover $focusHighlight': {
            opacity: 0
        }
    },
    focusHighlight: {}
});

const CardSkeleton: React.FC = () => {
    const classes = useStyles({ isHovered: false });

    return (
        <Card className={classes.cardCont} elevation={0} square>
            <CardActionArea disableRipple disableTouchRipple>
                <Skeleton
                    variant="rect"
                    animation="pulse"
                    height={225}
                    style={{ borderRadius: '8px' }}
                />

                <CardContent style={{ padding: '8px 0 0' }}>
                    <Typography style={{ fontWeight: 600 }}>
                        <Skeleton variant="text" />
                    </Typography>
                    <Typography variant="body2">
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CardSkeleton;
