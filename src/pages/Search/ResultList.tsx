import React from 'react';
import _ from 'lodash';
import { Box, Typography } from '@material-ui/core';

import Card, { CardSkeleton, ICardComponentProps } from '../../components/CardList/Card';

interface SearchResultListProps {
    loading: boolean;
    items: ICardComponentProps[];
    cardSize: 'small' | 'default';
}

const SearchResultList: React.FC<SearchResultListProps> = ({ loading, items, cardSize }) => {
    if (loading) {
        return <Typography>Loading ...</Typography>;
    }

    return (
        <Box className={`search-result-list ${cardSize === 'small' ? 'sm' : ''} overflow-overlay`}>
            {!!items.length ? (
                items.map((props) => <Card variant="horizontal" {...props} />)
            ) : (
                <Typography>There are no movies that matched your query.</Typography>
            )}
        </Box>
    );
};

export default SearchResultList;
