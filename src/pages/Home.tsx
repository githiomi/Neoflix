import {useContext} from "react";
import {FavouriteContext} from "../contexts/FavouriteContext.tsx";
import {Movie} from "../data/Movie.ts";
import Trending from "../components/Trending.tsx";
import Banner from "../components/Banner.tsx";

const Home = () => {

    const {favourites} = useContext(FavouriteContext);

    return (
        <>

            <Banner />

            <Trending />

            <ul>
                {
                    favourites?.length != 0
                        ? favourites?.map((movie: Movie) => <li key={movie.id}>{movie.title}</li>)
                        : <strong> There are no favourites</strong>
                }
            </ul>
        </>
    )
}
export default Home
