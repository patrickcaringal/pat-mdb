import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import { ICardSkeleton, IStyle } from './interfaces';
import { cardUseStyles as useStyles } from './styles';

interface IOwnProps extends ICardSkeleton, IStyle {}

const CardSkeleton: React.FC<IOwnProps> = ({ variant = 'vertical', style = {} }) => {
    const classes = useStyles({ ...style, variant });

    return (
        <Card className={classes.cardCont}>
            <CardActionArea
                classes={{
                    root: classes.actionArea,
                    focusHighlight: classes.focusHighlight
                }}
                disableRipple
                disableTouchRipple
            >
                <Skeleton variant="rect" animation="pulse" className={classes.cardImg} />
            </CardActionArea>

            <CardContent className={classes.cardContent}>
                {variant === 'vertical' && (
                    <div>
                        <Typography>
                            <Skeleton variant="text" />
                        </Typography>
                        <Typography variant="body2">
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                        </Typography>
                    </div>
                )}

                {variant === 'horizontal' && (
                    <>
                        <div>
                            <Typography variant="h6">
                                <Skeleton variant="text" width="30%" />
                            </Typography>

                            <Typography variant="body1">
                                <Skeleton variant="text" width="25%" />
                            </Typography>
                        </div>

                        <Typography variant="body2">
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                        </Typography>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default CardSkeleton;
