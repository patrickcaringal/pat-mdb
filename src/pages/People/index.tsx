import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import PeopleCatalog from './Catalog';
import PeopleDetail from './Detail';

interface MatchParams {
    id: string;
}

interface PeopleProps extends RouteComponentProps<MatchParams> {}

enum PageType {
    Detail = 'detail',
    Catalog = 'catalog'
}

const People: React.FC<PeopleProps> = ({ match }) => {
    const [pageType, setPageType] = useState<PageType>(PageType.Catalog);

    useEffect(() => {
        if (['popular'].includes(match.params.id)) {
            setPageType(PageType.Catalog);
        } else {
            setPageType(PageType.Detail);
        }
    }, [match.params.id]);

    if (pageType === PageType.Catalog) {
        return <PeopleCatalog />;
    }

    return <PeopleDetail />;
};

export default withRouter(People);
