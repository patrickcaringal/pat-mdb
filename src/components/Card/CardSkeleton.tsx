import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import { IStyle } from './interfaces';
import { cardUseStyles as useStyles } from './styles';

interface IOwnProps extends IStyle {}

const CardSkeleton: React.FC<IOwnProps> = ({ style = {} }) => {
    const classes = useStyles(style);

    return (
        <Card className={classes.cardCont}>
            <CardActionArea disableRipple disableTouchRipple>
                <Skeleton variant="rect" animation="pulse" className={classes.cardImg} />

                <CardContent className={classes.cardContent}>
                    <Typography>
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
