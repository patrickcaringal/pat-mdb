import React from 'react';

import Banner from './Banner';
import PopularList from './PopularList';
import TrendingList from './TrendingList';

const Home: React.FC = () => (
    <>
        <Banner />
        <PopularList />
        <TrendingList />
    </>
);

export default Home;
