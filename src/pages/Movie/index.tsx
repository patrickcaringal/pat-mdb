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

    const catalogPages = ['popular', 'now-playing', 'upcoming', 'top-rated'];

    useEffect(() => {
        const page = catalogPages.includes(match.params.id) ? PageType.Catalog : PageType.Detail;

        setPageType(page);
    }, [match.params.id]);

    if (pageType === PageType.Catalog) {
        return <MovieCatalog />;
    }

    return <MovieDetail />;
};

export default withRouter(Movie);
