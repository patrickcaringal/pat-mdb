import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import MovieCatalog from './Catalog';
import MovieDetail from './Detail';

import { isCategoryForCatalog } from '../../utils/helpers';

interface MatchParams {
    id: string;
}

interface MovieProps extends RouteComponentProps<MatchParams> {}

enum PageType {
    Detail = 'detail',
    Catalog = 'catalog'
}

const Movie: React.FC<MovieProps> = ({ match }) => {
    const [pageType, setPageType] = useState<PageType>(PageType.Catalog);

    const { id: movieCategory } = match.params;

    useEffect(() => {
        const page = isCategoryForCatalog(movieCategory) ? PageType.Catalog : PageType.Detail;

        setPageType(page);
    }, [movieCategory]);

    if (pageType === PageType.Catalog) {
        return <MovieCatalog />;
    }

    return <MovieDetail />;
};

export default withRouter(Movie);
