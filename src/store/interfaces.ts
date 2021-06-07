export enum media_type {
    'MOVIE' = 'movie',
    'TV' = 'tv'
}

// State
export interface IMedia {
    id: string;
    title: string;
    genres: string[];
    overview?: string;
    poster: string;
    release_date: string;
    // media?: media_type;
    media: media_type;
    episode_count?: number;
}

export interface IPerson {
    id: string;
    character: string;
    name: string;
    poster: string;
    episodes?: number;
    department?: string;
}

export interface ICredit {
    id: string;
    character: string;
    title: string;
    media: media_type;
    rating: number;
    popularity: number;
    poster: string;
    release_date: string;
}

export interface IVideo {
    id: string;
    description: string;
    thumbnail: string;
    video: string;
}

export interface ICompany {
    name: string;
    logo: string;
}

export interface IKeyword {
    id: string;
    name: string;
}

export interface IMediaDetail extends IMedia {
    banner: string;
    budget: number;
    cast: IPerson[];
    collection?: IMedia[];
    director: string[];
    keywords: IKeyword[];
    photos: string[];
    production_companies: ICompany[];
    recommendations: IMedia[];
    revenue: number;
    runtime: number;
    tagline: string;
    videos: IVideo[];
    vote_average: number;
    vote_count: number;
    // tv
    number_of_seasons?: number;
    number_of_episodes?: number;
}

export interface ICastCrew {
    cast: IPerson[];
    crew: IPerson[];
}

export interface IPersonDetail extends IPerson {
    biography: string;
    birthday: string;
    credits: ICredit[];
    department: string;
    photos: string[];
    place_of_birth: string;
    popularity: number;
}

export interface IMovieCatalog {
    page: number;
    total_pages: boolean;
    total_results: boolean;
    movies: IMedia[];
}

export interface ITVShowCatalog {
    page: number;
    total_pages: boolean;
    total_results: boolean;
    tvShows: IMedia[];
}

// export interface IPerson {
//     id: string;
//     name: string;
//     known_for: string[];
//     poster: string;
// }

export interface IPeopleCatalog {
    page: number;
    total_pages: boolean;
    total_results: boolean;
    results: IPerson[];
}

// Action
// export interface IGetPopularMedias {
//     type: typeof constants.GET_POPULAR_MOVIES;
//     payload: types.media;
// }

// export interface IGetPopularMediasSucceed {
//     type: typeof constants.GET_POPULAR_MEDIAS_SUCCEED;
//     payload: IMedia[];
// }

// export interface IGetPopularMediasFailed {
//     type: typeof constants.GET_POPULAR_MEDIAS_FAILED;
//     payload: string;
// }

// export interface IGetTrendingMedias {
//     type: typeof constants.GET_TRENDING_MEDIAS;
//     payload: types.media;
// }

// export interface IGetTrendingMediasSucceed {
//     type: typeof constants.GET_TRENDING_MEDIAS_SUCCEED;
//     payload: IMedia[];
// }

// export interface IGetTrendingMediasFailed {
//     type: typeof constants.GET_TRENDING_MEDIAS_FAILED;
//     payload: string;
// }

// export interface IGetCatalogMoviesPayload {
//     sort_by: string;
//     with_genres: string;
//     'primary_release_date.gte': string;
//     'primary_release_date.lte': string;
//     page?: number;
// }

// export interface IGetCatalogMovies {
//     type: typeof constants.GET_CATALOG_MOVIES;
//     payload: IGetCatalogMoviesPayload;
// }

// export interface IGetCatalogMoviesSucceed {
//     type: typeof constants.GET_CATALOG_MOVIES_SUCCEED;
//     payload: IMovieCatalog;
// }

// export interface IGetCatalogMoviesFailed {
//     type: typeof constants.GET_CATALOG_MOVIES_FAILED;
//     payload: string;
// }

// export interface IGetCatalogTVShowsPayload {
//     sort_by: string;
//     with_genres: string;
//     'air_date.gte': string;
//     'air_date.lte': string;
//     page?: number;
// }

// export interface IGetCatalogTVShows {
//     type: typeof constants.GET_CATALOG_TV_SHOWS;
//     payload: IGetCatalogTVShowsPayload;
// }

// export interface IGetCatalogTVShowsSucceed {
//     type: typeof constants.GET_CATALOG_TV_SHOWS_SUCCEED;
//     payload: ITVShowCatalog;
// }

// export interface IGetCatalogTVShowsFailed {
//     type: typeof constants.GET_CATALOG_TV_SHOWS_FAILED;
//     payload: string;
// }

// export interface IGetCatalogPeoplePayload {
//     query?: string;
//     page?: number;
// }

// export interface IGetCatalogPeople {
//     type: typeof constants.GET_CATALOG_PEOPLE;
//     payload: IGetCatalogPeoplePayload;
// }

// export interface IGetCatalogPeopleSucceed {
//     type: typeof constants.GET_CATALOG_PEOPLE_SUCCEED;
//     payload: IPeopleCatalog;
// }

// export interface IGetCatalogPeopleFailed {
//     type: typeof constants.GET_CATALOG_PEOPLE_FAILED;
//     payload: string;
// }

// // Movie detail
// export interface IGetMovieDetailPayload {
//     id: string;
// }

// export interface IGetMovieDetail {
//     type: typeof constants.GET_MOVIE_DETAIL;
//     payload: IGetMovieDetailPayload;
// }

// export interface IGetMovieDetailSucceed {
//     type: typeof constants.GET_MOVIE_DETAIL_SUCCEED;
//     payload: IMediaDetail;
// }

// export interface IGetMovieDetailFailed {
//     type: typeof constants.GET_MOVIE_DETAIL_FAILED;
//     payload: string;
// }
export interface IStateEntity<T> {
    data: T;
    fetching: boolean;
    fetchFailed: boolean;
}

export type TState = {
    media: {
        popularMediaList: IStateEntity<IMedia[]>;
    };
    movie: {
        detail: IStateEntity<IMediaDetail>;
        credits: IStateEntity<ICastCrew>;
    };
    tvShow: {
        detail: IStateEntity<IMediaDetail>;
    };
    person: {
        detail: IStateEntity<IPersonDetail>;
    };
};

// export type TAction =
//     | IGetPopularMedias
//     | IGetPopularMediasSucceed
//     | IGetPopularMediasFailed
//     | IGetTrendingMedias
//     | IGetTrendingMediasSucceed
//     | IGetTrendingMediasFailed
//     | IGetCatalogMovies
//     | IGetCatalogMoviesSucceed
//     | IGetCatalogMoviesFailed
//     | IGetCatalogTVShows
//     | IGetCatalogTVShowsSucceed
//     | IGetCatalogTVShowsFailed
//     | IGetCatalogPeople
//     | IGetCatalogPeopleSucceed
//     | IGetCatalogPeopleFailed
//     | IGetMovieDetail
//     | IGetMovieDetailSucceed
//     | IGetMovieDetailFailed;
