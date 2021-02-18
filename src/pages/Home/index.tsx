import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

// import { actions, interfaces, types } from '../../ducks';

import Banner from './Banner';
import PopularList from './PopularList';

// interface IStateToProps {
//     // trendingMedias: interfaces.IMedia[];
//     // loaders: { [key: string]: boolean };
// }

// interface IDispatchToProps {
//     // getTrendingMedias: (media: types.media) => interfaces.IGetTrendingMedias;
// }

interface IOwnProps extends RouteComponentProps {}

const Home: React.FC<IOwnProps> = () => {
    // const [trendingMediaType, setTrendingMediaType] = useState('movie');

    const renders = React.useRef(0);

    // const { isTrendingLoading } = loaders;

    // const mappedTrendingMedia = useMemo(
    //     () =>
    //         trendingMedias.map((i: interfaces.IMedia) => {
    //             const { id, poster: image, title, genres: subtitle } = i;
    //             // console.log('mappedTrendingMedia');
    //             return {
    //                 id,
    //                 image,
    //                 title,
    //                 subtitle: subtitle.join(', ')
    //             };
    //         }),
    //     [trendingMedias]
    // );

    // useEffect(() => {
    //     getTrendingMedias(trendingMediaType as types.media);
    // }, [trendingMediaType, getTrendingMedias]);

    return (
        <>
            <Banner />
            <PopularList />

            {/* Trending */}
            {/* <CardList
                header={
                    <>
                        <Typography variant="h5" style={{ fontWeight: 600, marginRight: 16 }}>
                            Trending
                        </Typography>
                        <Toggle
                            buttons={toggleButtons}
                            selected={trendingMediaType}
                            onToggleChange={(value: string) => {
                                setTrendingMediaType(value);
                            }}
                        />
                    </>
                }
                data={mapToCardData(trendingMedias)}
                loading={isTrendingLoading}
                onCardClick={handleCardClick}
            /> */}
        </>
    );
};

// const mapStateToProps = (state: interfaces.TState) => {
//     return {
//         // trendingMedias: state.trendingMedias,
//         // loaders: state.loaders
//     };
// };

// const mapDispatchToProps = {
//     // getTrendingMedias: actions.getTrendingMedias
// };

export default withRouter(Home);
