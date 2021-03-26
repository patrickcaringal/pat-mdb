import React from 'react';

import Container from '@material-ui/core/Container';

import Banner from './Banner';
import PopularList from './PopularList';
import TrendingList from './TrendingList';

const Home: React.FC = () => (
    <>
        <Banner />
        <Container disableGutters maxWidth="lg">
            <PopularList />
            <TrendingList />
        </Container>
    </>
);

export default Home;
