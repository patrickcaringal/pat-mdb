import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import useIntersect from '../../customhooks/useIntersect';

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

interface MovieCardProps extends RouteComponentProps {
    image: string;
    title: string;
    subtitle: string;
    onClick?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ image, title, subtitle, onClick = () => {} }) => {
    const [isShown, setIsShown] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const classes = useStyles({ isHovered });

    const IOOptions = { rootMargin: '0px 300px 0px 0px' };
    const [IOref] = useIntersect(IOOptions, (shown: boolean) => setIsShown(shown));

    return (
        <Card
            className={classes.cardCont}
            elevation={0}
            square
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

                <CardContent
                    style={{
                        padding: '8px 0 0',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    <Typography noWrap style={{ fontWeight: 600 }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" style={{ color: '#696969' }}>
                        {subtitle}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default withRouter(MovieCard);
