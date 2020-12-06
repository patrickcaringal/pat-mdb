import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import useIntersect from '../../../customhooks/useIntersect';

const useStyles = makeStyles({
    cardCont: {
        width: 'calc(((100vw - 80px - 260px - 128px) / 4))',
        maxWidth: 200,
        marginLeft: 30,
        marginBottom: 30
    },
    cardImg: {
        height: 'calc((((100vw - 80px - 260px - 128px) / 4)) * 1.5)',
        maxHeight: 'calc(208px * 1.5)'
    },
    cardContent: {
        '&.MuiCardContent-root:last-child': {
            paddingBottom: 16
        }
    },
    title: {
        fontWeight: 600
    },
    subtitle: {
        color: '#696969'
    },
    actionArea: {
        '&:hover $focusHighlight': {
            opacity: 0
        }
    },
    focusHighlight: {},
    cardContFiller: {
        width: 'calc(((100vw - 80px - 260px - 128px) / 4))',
        maxWidth: 200,
        marginLeft: 30,
        marginBottom: 30,
        opacity: 0
    }
});

interface IStateToProps {
    image: string;
    title: string;
    subtitle: string;
    onClick?: () => void;
}

interface MovieCardProps extends IStateToProps, RouteComponentProps {}

const MovieCard: React.FC<MovieCardProps> = ({ image, title, subtitle, onClick = () => {} }) => {
    const [isShown, setIsShown] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const classes = useStyles({ isHovered });

    const IOOptions = { rootMargin: '0px 0px 300px 0px' };
    const [IOref] = useIntersect(IOOptions, (shown: boolean) => setIsShown(shown));

    return (
        <Card
            className={classes.cardCont}
            {...({ ref: IOref } as any)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
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
                    <Typography className={classes.title}>{title}</Typography>
                    <Typography variant="body2" className={classes.subtitle}>
                        {subtitle}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default withRouter(MovieCard);

export const CardSkeleton: React.FC = () => {
    const classes = useStyles({ isHovered: false });

    return (
        <Card className={classes.cardCont} elevation={0} square>
            <CardActionArea disableRipple disableTouchRipple>
                <Skeleton variant="rect" animation="pulse" className={classes.cardImg} />

                <CardContent style={{ padding: '8px 0 0' }}>
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

export const CardFiller: React.FC = () => {
    const classes = useStyles();
    return <Card className={classes.cardContFiller} />;
};
