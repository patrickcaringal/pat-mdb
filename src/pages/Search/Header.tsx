import React from 'react';
import { Box, Chip, Typography } from '@material-ui/core';

import * as i from '../../store/interfaces';

interface SearchHeaderProps {
    query: string;
    selected: i.media_type | null;
    movieResult: number;
    tvShowResult: number;
    personResult: number;
    onChipClick: (category: i.media_type | null) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
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

    const isSelected = (category: typeof selected) =>
        selected === category ? 'primary' : 'default';

    return (
        <Box className="search-header">
            {!noResult ? (
                <>
                    <Typography>Results for "{query}"</Typography>
                    <Box className="category-chip-container">
                        {hasMovieResult && (
                            <Chip
                                size="small"
                                color={isSelected(i.media_type.MOVIE)}
                                label={`${movieResult} Movies`}
                                clickable
                                onClick={() => onChipClick(i.media_type.MOVIE)}
                            />
                        )}
                        {hasTvShowResult && (
                            <Chip
                                size="small"
                                color={isSelected(i.media_type.TV)}
                                label={`${tvShowResult} TV Shows`}
                                clickable
                                onClick={() => onChipClick(i.media_type.TV)}
                            />
                        )}
                        {hasPersonResult && (
                            <Chip
                                size="small"
                                color={isSelected(i.media_type.PERSON)}
                                label={`${personResult} People`}
                                clickable
                                onClick={() => onChipClick(i.media_type.PERSON)}
                            />
                        )}
                    </Box>
                </>
            ) : (
                <Typography>No result found for "{query}"</Typography>
            )}
        </Box>
    );
};

export default SearchHeader;
