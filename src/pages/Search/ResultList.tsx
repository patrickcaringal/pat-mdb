import React from 'react';
import _ from 'lodash';
import { Box, Chip, Typography } from '@material-ui/core';

import * as i from '../../store/interfaces';

import Card, { CardSkeleton, ICardComponentProps } from '../../components/CardList/Card';

interface SearchResultListProps {
    items: ICardComponentProps[];
}

const SearchResultList: React.FC<SearchResultListProps> = ({ items }) => {
    return (
        <Box className="search-body">
            {items.map((props) => (
                <Card variant="horizontal" {...props} />
            ))}
        </Box>
    );
};

export default SearchResultList;
