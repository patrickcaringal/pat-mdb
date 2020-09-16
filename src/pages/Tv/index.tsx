import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import TvShowCatalog from './Catalog';
import TvShowDetail from './Detail';

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

    useEffect(() => {
        if (['popular', 'airing-today', 'on-the-air', 'top-rated'].includes(match.params.id)) {
            setPageType(PageType.Catalog);
        } else {
            setPageType(PageType.Detail);
        }
    }, [match.params.id]);

    if (pageType === PageType.Catalog) {
        return <TvShowCatalog />;
    }

    return <TvShowDetail />;
};

export default withRouter(TvShow);
