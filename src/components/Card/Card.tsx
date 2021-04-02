import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import { ICard, IStyle } from './interfaces';
import { cardUseStyles as useStyles } from './styles';

import useIntersect from '../../customhooks/useIntersect';

interface IOwnProps extends ICard, IStyle {}

const CardComp: React.FC<IOwnProps> = ({
    image,
    title,
    subtitle,
    description = '',
    variant = 'vertical',
    onClick = () => {},
    style = {}
}) => {
    const [isShown, setIsShown] = useState<boolean>(false);

    const classes = useStyles({ ...style, variant });

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
            </CardActionArea>

            <CardContent className={classes.cardContent}>
                <div>
                    <Typography
                        variant={variant === 'vertical' ? 'body1' : 'h6'}
                        noWrap
                        className={classes.title}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant={variant === 'vertical' ? 'body2' : 'body1'}
                        color="textSecondary"
                    >
                        {subtitle}
                    </Typography>
                </div>

                {!!description && <Typography className="line-clamp">{description}</Typography>}
            </CardContent>
        </Card>
    );
};

export default CardComp;
