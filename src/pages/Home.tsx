import { useState } from "react";
import { Movie } from "../data/Movie.ts";
import Trending from "../components/Trending.tsx";
import Banner from "../components/Banner.tsx";
import Search from "../components/Search.tsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Response from "../data/Response.ts";
import MovieCard from "../components/MovieCard.tsx";

const Home = () => {

    const API_BASE_URL: string = "https://api.themoviedb.org/3" as string;
    const API_KEY: string = import.meta.env.VITE_TMDB_API_TOKEN;
    const API_OPTIONS = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`
        }
    }

    const fetchInitialMovies = async (): Promise<Movie[]> => {

        const endpoint: string = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

        const response = await axios.get(endpoint, API_OPTIONS);
        const movies: Response = await response.data;

        console.log(movies)

        return movies.results;
    }

    const [search, setSearch] = useState<string>("")

    const {
        data: fetchedMovies,
        isLoading: isMoviesLoading,
        isError: isMoviesError,
        error: movieFetchError
    } = useQuery({
        queryKey: ["Movies"],
        queryFn: fetchInitialMovies
    });

    if (isMoviesError)
        return <div className="text-red-600">There was an error: {movieFetchError.message}</div>

    return (
        <>
            <div className="pattern" />

            <Banner />

            <Search searchTerm={search} setSearchTerm={setSearch} />

            <p>You have searched for: {search}</p>

            <Trending />

            {isMoviesLoading && (
                <div className="text-green-500 uppercase">
                    <p>Loading...</p>
                </div>
            )}

            {fetchedMovies && (
                <>
                    <p className="text-[#747bff] text-2xl font-bold uppercase text-center">These are your movies</p>

                    {
                        fetchedMovies.map((movie: Movie) => (
                            <div key={movie.id} className="movie-card">
                                Movie name: <span className="text-red-600 font-bold">{movie.title}</span>
                                <MovieCard movie={movie} />
                            </div>))
                    }
                </>
            )}

        </>
    )
}
export default Home
