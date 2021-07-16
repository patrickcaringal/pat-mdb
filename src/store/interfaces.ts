export enum media_type {
    'MOVIE' = 'movie',
    'TV' = 'tv',
    'PERSON' = 'person'
}

// State
export interface IMedia {
    id: string;
    title: string;
    genres: string[];
    overview: string; // check if need optional
    poster: string;
    release_date: string;
    // media?: media_type;
    media: media_type;
    // tv props
    // episode_count?: number; check if need optional
    seasonNumber?: number;
}

export interface IEpisode {
    title: string;
    number: number;
    overview: string;
    poster: string;
}

export interface IPerson {
    id: string;
    character: string;
    name: string;
    poster: string;
    episodes?: number;
    department?: string;
    knownFor?: string[]; // alt for credit titles
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

export interface ISeasonDetail extends IMediaDetail {
    seasonNumber: number;
    episodes: IEpisode[];
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

// SEARCH START
export interface ISearchCountDetail {
    label: string;
    total_pages: number;
    total_results: number;
}

export interface ISearchCount {
    query: string;
    movies: ISearchCountDetail;
    tvShow: ISearchCountDetail;
    person: ISearchCountDetail;
}

export interface ISearchResultList {
    page: number;
    total_pages: number;
    total_results: number;
    results: IPerson[] | IMedia[];
}
// SEARCH END

export interface IStateEntity<T> {
    data: T;
    fetching: boolean;
    fetchFailed: boolean;
}

export type TState = {
    media: {
        searchCount: IStateEntity<ISearchCount>;
        searchResultList: IStateEntity<ISearchResultList>;
        popularMediaList: IStateEntity<IMedia[]>;
        detail: IStateEntity<IMediaDetail>;
        seasonDetail: IStateEntity<ISeasonDetail>;
        credits: IStateEntity<ICastCrew>;
    };
    movie: {
        detail: IStateEntity<IMediaDetail>;
        credits: IStateEntity<ICastCrew>;
    };
    tvShow: {
        detail: IStateEntity<IMediaDetail>;
        credits: IStateEntity<ICastCrew>;
    };
    person: {
        detail: IStateEntity<IPersonDetail>;
    };
};
