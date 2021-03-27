import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import useIntersect from '../../customhooks/useIntersect';
import { cardUseStyles as useStyles } from './styles';
import { ICardProps } from './interfaces';

interface IOwnProps extends ICardProps {
    style?: { width?: number; imgHeight?: number; marginRight?: number };
}

const CardComp: React.FC<IOwnProps> = ({
    image,
    title,
    subtitle,
    onClick = () => {},
    style = {}
}) => {
    const [isShown, setIsShown] = useState<boolean>(false);

    const classes = useStyles(style);

    const IOOptions = { rootMargin: '0px 300px 0px 0px' };
    const [IOref] = useIntersect(IOOptions, (shown: boolean) => setIsShown(shown));

    return (
        <Card className={classes.cardCont} {...({ ref: IOref } as any)}>
            <CardActionArea
                classes={{
                    root: classes.actionArea,
                    focusHighlight: classes.focusHighlight
                }}
                disableRipple
                disableTouchRipple
                onClick={onClick}
            >
                {isShown ? (
                    <CardMedia className={classes.cardImg} image={image} title={title} />
                ) : (
                    <Skeleton variant="rect" animation="pulse" className={classes.cardImg} />
                )}

                <CardContent className={classes.cardContent}>
                    <Typography noWrap className={classes.title}>
                        {title}
                    </Typography>
                    <Typography variant="body2" className={classes.subtitle}>
                        {subtitle}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CardComp;
