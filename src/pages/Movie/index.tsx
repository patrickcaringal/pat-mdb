import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import MovieCatalog from './Catalog';
import MovieDetail from './Detail';

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

    useEffect(() => {
        if (['popular', 'upcoming', 'top-rated'].includes(match.params.id)) {
            setPageType(PageType.Catalog);
        } else {
            setPageType(PageType.Detail);
        }
    }, [match.params.id]);

    if (pageType === PageType.Catalog) {
        return <MovieCatalog />;
    }

    return <MovieDetail />;
};

export default withRouter(Movie);
