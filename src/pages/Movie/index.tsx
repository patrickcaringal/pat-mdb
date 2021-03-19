import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import MovieCatalog from './Catalog';
import MovieDetail from './Detail';

import { isCategoryForCatalog } from '../../utils/helpers';

interface MatchParams {
    id: string;
}

interface TvShowProps extends RouteComponentProps<MatchParams> {}

enum PageType {
    Detail = 'detail',
    Catalog = 'catalog'
}

const TvShow: React.FC<TvShowProps> = ({ match }) => {
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

export default withRouter(TvShow);
