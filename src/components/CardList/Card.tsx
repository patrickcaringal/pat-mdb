import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, CardActionArea, Typography } from '@material-ui/core';

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
    }
}));

interface IOwnProps {
    variant?: 'horizontal' | 'vertical';
    poster: string;
    title?: string;
    subtitle?: string;
    description?: string;
    onClick: () => void;
}

const CardComponent: React.FC<IOwnProps> = ({
    variant = 'vertical',
    poster,
    title,
    subtitle,
    description = '',
    onClick
}) => {
    const classes = useStyles();

    if (variant === 'vertical') {
        const hasContent = title || subtitle;
        return (
            <Card className={classes.cardContainer}>
                <CardActionArea onClick={onClick}>
                    <CardMedia className="media" image={poster} title="asd" />
                    {hasContent && (
                        <CardContent className="card-content">
                            {title && <Typography variant="body1">{title}</Typography>}
                            {subtitle && (
                                <Typography variant="body2" color="textSecondary">
                                    {subtitle}
                                </Typography>
                            )}
                        </CardContent>
                    )}
                </CardActionArea>
            </Card>
        );
    }

    return (
        <Card className={classes.horizontalCardContainer}>
            <CardActionArea onClick={onClick}>
                <CardMedia className="media" image={poster} title="asd" />
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
};

export default CardComponent;
