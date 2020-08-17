import React, { useState } from 'react';
import MUICard from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Skeleton from '@material-ui/lab/Skeleton';
import useIntersect from '../../customhooks/useIntersect';

interface ICard {
    image: string;
    title: string;
    subtitle: string;
}

const Card: React.FC<ICard> = ({ image, title, subtitle }) => {
    const [isShown, setIsShown] = useState(false);

    const IOOptions = { rootMargin: '0px 300px 0px 0px' };
    const [IOref] = useIntersect(IOOptions, (shown: boolean) => setIsShown(shown));

    return (
        <MUICard
            style={{
                minWidth: '150px',
                background: 'transparent',
                marginRight: '30px'
            }}
            elevation={0}
            square
            {...({ ref: IOref } as any)}
        >
            {isShown ? (
                <CardMedia
                    style={{
                        height: '225px',
                        borderRadius: '8px'
                    }}
                    image={image}
                    // 'https://via.placeholder.com/150x225/767c77/fabea7'
                    title={title}
                />
            ) : (
                <Skeleton
                    variant="rect"
                    animation="pulse"
                    height={225}
                    style={{
                        borderRadius: '8px'
                    }}
                />
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
        </MUICard>
    );
};

export default Card;
