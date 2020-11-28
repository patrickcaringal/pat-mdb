import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Sidebar from './Sidebar';
import MovieCards from './MovieCards';

import { convertUrlToWord } from '../../../utils/helpers';

interface MatchParams {
    id: string;
}

interface MovieProps extends RouteComponentProps<MatchParams> {}

const Catalog: React.FC<MovieProps> = ({ match }) => {
    const { id: movieCategory } = match.params;

    return (
        <Box display="flex" mx={4} my={3}>
            <Container disableGutters maxWidth="lg">
                <Typography
                    variant="h5"
                    style={{ fontWeight: 600, marginBottom: 16, textTransform: 'capitalize' }}
                >
                    {convertUrlToWord(movieCategory)}
                </Typography>

                <Grid container>
                    {/* Sort & Filter sidebar */}
                    <Grid item xs={3}>
                        <Sidebar />
                    </Grid>

                    {/* Catalog */}
                    <Grid item xs={9}>
                        <MovieCards />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default withRouter(Catalog);
