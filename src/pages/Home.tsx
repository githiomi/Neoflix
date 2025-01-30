import {useContext, useEffect, useState} from "react";
import {FavouriteContext} from "../contexts/FavouriteContext.tsx";
import {Movie} from "../data/Movie.ts";
import Trending from "../components/Trending.tsx";
import Banner from "../components/Banner.tsx";
import Search from "../components/Search.tsx";

const Home = () => {

    const API_BASE_URL: string = "https://api.themoviedb.org/3" as string;
    const API_KEY: string = import.meta.env.VITE_API_READ_ACCESS_TOKEN;
    const API_OPTIONS = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`
        }
    }
    const [fetchError, setFetchError] = useState("");

    const fetchInitialMovies = async () => {

        try {
            const endpoint : string = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

            const response:Response = await fetch(endpoint, API_OPTIONS);
            const movies = await response.body;

            console.log(movies)

        } catch (error) {
            console.error("Error: " + error)
            setFetchError((e) => `Error: ${e}`);
        } finally {
            console.log("Movie fetching complete")
        }
    }

    const {favourites} = useContext(FavouriteContext);
    const [search, setSearch] = useState<string>("")

    useEffect(() => {
        fetchInitialMovies()
    }, []);

    return (
        <>
            <div className="pattern"/>

            <Banner/>

            <Search searchTerm={search} setSearchTerm={setSearch}/>

            You have searched for: {search}

            {
                fetchError && <strong>There was an error fetching the movies: {fetchError}</strong>
            }

            <Trending/>

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
