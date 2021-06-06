import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, CardActionArea, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        width: 138,
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(3),
        '& .media': {
            height: 175
        },
        '& .card-content': {
            padding: theme.spacing(1)
        }
    },
    horizontalCardContainer: {
        '&:not(:last-child)': {
            marginBottom: theme.spacing(3)
        },
        '& .MuiCardActionArea-root': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start'
        },
        '& .media': {
            height: 175,
            width: 120
        },
        '& .card-content': {
            flex: 1,
            height: 175,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: theme.spacing(2)
        }
    },
    blankCardContainer: {
        background: '#EAEFEA',
        display: 'flex',
        width: 138,
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(3),

        '& .card-content-blank': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }
    }
}));

export interface ICardComponentProps {
    variant?: 'horizontal' | 'vertical' | 'blank';
    poster?: string;
    title?: string;
    subtitle?: string;
    subtitle2?: string;
    description?: string;
    skeleton?: boolean;
    onClick: () => void;
    children?: ReactNode;
}

const CardComponent: React.FC<ICardComponentProps> = ({
    variant = 'vertical',
    poster,
    title,
    subtitle,
    subtitle2,
    description = '',
    onClick,
    children
}) => {
    const classes = useStyles();

    if (variant === 'vertical') {
        const hasContent = title || subtitle;
        return (
            <Card className={classes.cardContainer}>
                <CardActionArea onClick={onClick}>
                    <CardMedia className="media" image={poster} title={title || ''} />
                    {hasContent && (
                        <CardContent className="card-content">
                            {title && <Typography variant="body1">{title}</Typography>}
                            {subtitle && (
                                <Typography variant="body2" color="textSecondary">
                                    {subtitle}
                                </Typography>
                            )}
                            {subtitle2 && (
                                <Typography variant="body2" color="textSecondary">
                                    {subtitle2}
                                </Typography>
                            )}
                        </CardContent>
                    )}
                </CardActionArea>
            </Card>
        );
    }

    if (variant === 'horizontal') {
        return (
            <Card className={classes.horizontalCardContainer}>
                <CardActionArea onClick={onClick}>
                    <CardMedia className="media" image={poster} title={title || ''} />
                    <CardContent className="card-content">
                        <div>
                            <Typography variant="body1">{title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {subtitle}
                            </Typography>
                        </div>
                        <Typography className="line-clamp" variant="body2">
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }

    return (
        <Card className={classes.blankCardContainer}>
            <CardActionArea onClick={onClick}>
                <CardContent className="card-content-blank">{children}</CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CardComponent;

interface ICardSkeleton {
    variant?: 'horizontal' | 'vertical';
    hasContent?: boolean;
}

export const CardSkeleton: React.FC<ICardSkeleton> = ({
    variant = 'vertical',
    hasContent = true
}) => {
    const classes = useStyles();

    return variant === 'vertical' ? (
        <Card className={classes.cardContainer}>
            <CardActionArea>
                <Skeleton variant="rect" className="media" />
                {hasContent && (
                    <CardContent className="card-content">
                        <Typography variant="body1">
                            <Skeleton variant="text" />
                        </Typography>
                        <Typography variant="body2">
                            <Skeleton variant="text" />
                        </Typography>
                    </CardContent>
                )}
            </CardActionArea>
        </Card>
    ) : (
        <Card className={classes.horizontalCardContainer}>
            <CardActionArea>
                <Skeleton variant="rect" className="media" />
                <CardContent className="card-content">
                    <div>
                        <Typography variant="body1">
                            <Skeleton variant="text" width={140} />
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            <Skeleton variant="text" width={100} />
                        </Typography>
                    </div>
                    <Typography className="line-clamp" variant="body2">
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" width="90%" />
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
