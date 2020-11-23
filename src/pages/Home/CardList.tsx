import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    header: string | React.ReactElement;
    data: ICard[];
    loading: boolean;
    onCardClick: (id: string) => void;
}

const useStyles = makeStyles((theme) => ({}));

const CardList: React.FC<ICardList> = ({ data, header, loading, onCardClick }) => {
    const classes = useStyles();

    return (
        <Box display="flex" p={3}>
            <Container disableGutters maxWidth="lg">
                <Box display="flex" py={1}>
                    {typeof header === 'string' ? (
                        <Typography variant="h5" style={{ fontWeight: 600 }}>
                            {header}
                        </Typography>
                    ) : (
                        header
                    )}
                </Box>

                <Box display="flex" style={{ overflow: 'auto' }} pt={1} pb={2}>
                    {!loading && data.length
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
