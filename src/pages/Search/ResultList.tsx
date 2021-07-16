import React from 'react';
import _ from 'lodash';
import { Box, Chip, Typography } from '@material-ui/core';

import * as i from '../../store/interfaces';

import Card, { CardSkeleton, ICardComponentProps } from '../../components/CardList/Card';

interface SearchResultListProps {
    query: string;
    selected: i.media_type | null;
    movieResult: number;
    tvShowResult: number;
    personResult: number;
    onChipClick: (category: i.media_type | null) => void;
}

const SearchResultList: React.FC<SearchResultListProps> = ({
    query,
    selected,
    movieResult,
    tvShowResult,
    personResult,
    onChipClick
}) => {
    const hasMovieResult = !!movieResult;
    const hasTvShowResult = !!tvShowResult;
    const hasPersonResult = !!personResult;
    const noResult = !hasMovieResult && !hasTvShowResult && !hasPersonResult;

    // const isSelected = (category: typeof selected) =>
    //     selected === category ? 'primary' : 'default';

    return (
        <Box className="search-body">
            {_.range(2).map(() => (
                <Card
                    variant="horizontal"
                    {...{
                        onClick: () => {},
                        poster: 'https://via.placeholder.com/94x141/767c77/fabea7',
                        title: 'title',
                        subtitle: 'subtitle',
                        description:
                            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum quam temporibus rerum?'
                    }}
                />
            ))}
        </Box>
    );
};

export default SearchResultList;
