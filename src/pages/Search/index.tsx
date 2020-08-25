import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { parse as QSParse } from 'query-string';

interface SearchProps extends RouteComponentProps {}

const SearchPage: React.FC<SearchProps> = (props) => {
    // console.log(QSParse(props.location.search));
    return <h1>{QSParse(props.location.search).query}</h1>;
};

export default withRouter(SearchPage);
