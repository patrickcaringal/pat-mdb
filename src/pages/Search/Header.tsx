import React from 'react';
import { Box, Chip, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import * as i from '../../store/interfaces';

interface SearchHeaderProps {
    loading: boolean;
    query: string;
    selected: i.media_type | null;
    movieResult: number;
    tvShowResult: number;
    personResult: number;
    onChipClick: (category: i.media_type | null) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
    loading,
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

    if (loading) return <SearchHeaderSkeleton />;

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

const SearchHeaderSkeleton: React.FC = () => (
    <Box className="search-header">
        <>
            <Typography>
                <Skeleton variant="text" width={160} />
            </Typography>
            <Box className="category-chip-container">
                <Skeleton variant="rect" width={90} height={24} />
                <Skeleton variant="rect" width={90} height={24} />
                <Skeleton variant="rect" width={90} height={24} />
            </Box>
        </>
    </Box>
);
