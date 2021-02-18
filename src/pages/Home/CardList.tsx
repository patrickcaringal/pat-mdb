import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import Card, { CardSkeleton } from './Card';

interface ICard {
    id: string;
    image: string;
    title: string;
    subtitle: string;
}

interface ICardList {
    header: any;
    data: ICard[];
    loading: boolean;
    // onCardClick: (id: string) => void;
}

const useStyles = makeStyles((theme) => ({}));

const CardList: React.FC<ICardList> = ({
    data,
    header,
    loading
    // , onCardClick
}) => {
    const classes = useStyles();
    const renders = React.useRef(0);

    return (
        <Box display="flex" p={3}>
            <Container disableGutters maxWidth="lg">
                <Box display="flex" py={1}>
                    {header}
                </Box>
                <Box display="flex" style={{ overflow: 'auto' }} pt={1} pb={2}>
                    {!loading && data.length
                        ? data.map((i: ICard) => {
                              const { id, ...rest } = i;
                              return (
                                  <Card
                                      key={id}
                                      {...rest}
                                      //   onClick={() => onCardClick(`${id}`)}
                                  />
                              );
                          })
                        : [...Array(10)].map(() => <CardSkeleton />)}
                </Box>
            </Container>
        </Box>
    );
};

export default React.memo(CardList);
