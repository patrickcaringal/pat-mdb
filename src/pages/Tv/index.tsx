import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import TvShowCatalog from './Catalog';
import TvShowDetail from './Detail';

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

    const { id: tvShowCategory } = match.params;

    useEffect(() => {
        const page = isCategoryForCatalog(tvShowCategory) ? PageType.Catalog : PageType.Detail;

        setPageType(page);
    }, [match.params.id]);

    if (pageType === PageType.Catalog) {
        return <TvShowCatalog />;
    }

    return <TvShowDetail />;
};

export default withRouter(TvShow);
