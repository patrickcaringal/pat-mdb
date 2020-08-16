import React, { useState } from 'react';
import MUICard from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import useIntersect from '../../customhooks/useIntersect';

interface ICard {}

const Card: React.FC<ICard> = (props) => {
    const [isShown, setIsShown] = useState(false);

    const IOOptions = { rootMargin: '0px 300px 0px 0px' };
    const [ref] = useIntersect(IOOptions, (shown: boolean) => {
        setIsShown(shown);
    });

    return (
        <MUICard
            style={{
                minWidth: '150px',
                background: 'transparent',
                marginRight: '20px'
            }}
            elevation={0}
            square
            {...({ ref: ref } as any)}
        >
            <CardMedia
                style={{
                    height: '225px'
                }}
                image={
                    isShown
                        ? 'https://via.placeholder.com/150x225/767c77/fabea7'
                        : 'https://via.placeholder.com/150x225'
                }
                title="Twice"
            />
            <CardContent style={{ padding: '8px 0 0' }}>
                <Typography>Item {`${isShown}`}</Typography>
                <Typography variant="caption">Action, Thriller</Typography>
            </CardContent>
        </MUICard>
    );
};

export default Card;
