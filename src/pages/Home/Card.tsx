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
    const [ref] = useIntersect(IOOptions, (shown: boolean) => setIsShown(shown));

    return (
        <MUICard
            style={{
                minWidth: '150px',
                background: 'transparent',
                marginRight: '30px'
            }}
            elevation={0}
            square
            {...({ ref: ref } as any)}
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

            {/* style={{overflow: "hidden", textOverflow: "ellipsis", width: '11rem'}} */}
            <CardContent
                style={{
                    padding: '8px 0 0',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}
            >
                <Typography noWrap>{title}</Typography>
                <Typography variant="caption">{subtitle}</Typography>
            </CardContent>
        </MUICard>
    );
};

export default Card;
