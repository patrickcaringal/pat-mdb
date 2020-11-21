import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Card, { CardSkeleton } from './Card';

interface ICard {
    id: string;
    image: string;
    title: string;
    subtitle: string;
}

interface ICardList {
    header: string;
    data: ICard[];
    isLoading: boolean;
    onCardClick: (id: string) => void;
}

const CardList: React.FC<ICardList> = ({ data, header, isLoading, onCardClick }) => {
    return (
        <Box display="flex" p={3}>
            <Container disableGutters maxWidth="lg">
                <Box display="flex" py={1}>
                    <Typography variant="h5" style={{ fontWeight: 600 }}>
                        {header}
                    </Typography>
                </Box>

                <Box display="flex" style={{ overflow: 'auto' }} pt={1} pb={2}>
                    {!isLoading
                        ? data.map((i: ICard) => {
                              const { id, ...rest } = i;
                              return (
                                  <Card key={id} {...rest} onClick={() => onCardClick(`${id}`)} />
                              );
                          })
                        : [...Array(10)].map(() => <CardSkeleton />)}
                </Box>
            </Container>
        </Box>
    );
};

export default CardList;
