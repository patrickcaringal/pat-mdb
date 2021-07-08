import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Chip, Container, Typography } from '@material-ui/core';

import Card, { CardSkeleton, ICardComponentProps } from '../../components/CardList/Card';

const useStyles = makeStyles((theme) => ({
    content: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        // paddingBottom: theme.spacing(4),
        // border: '1px solid red',
        height: 'calc(100vh - 64px)',

        '& .search-header': {
            display: 'flex',
            flexDirection: 'column',
            // border: '1px solid khaki',

            '& .category-chip-container': {
                marginTop: theme.spacing(1),
                '& .MuiChip-label': {
                    paddingLeft: 12,
                    paddingRight: 12
                },
                '& .MuiChip-root': {
                    marginRight: theme.spacing(1)
                }
            }
        },
        '& .search-body': {
            flex: 1,
            // border: '1px solid khaki',
            marginTop: theme.spacing(3)
        }
    }
}));

interface SearchProps extends RouteComponentProps {}

const SearchPage: React.FC<SearchProps> = (props) => {
    const classes = useStyles();

    return (
        <Container className={classes.content}>
            <Box className="search-header">
                <Typography>Results for "avenger"</Typography>

                <Box className="category-chip-container">
                    <Chip size="small" label="22 Movies" />
                    <Chip size="small" label="15 TV Shows" />
                    <Chip size="small" label="1,000 People" />
                </Box>
            </Box>

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
        </Container>
    );
};

export default withRouter(SearchPage);
