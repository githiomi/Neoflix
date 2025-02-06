import { useState } from "react";
import Movie from "../data/Movie.ts";
import Trending from "../components/Trending.tsx";
import Banner from "../components/Banner.tsx";
import Search from "../components/Search.tsx";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "../components/MovieCard.tsx";
import { useDebounce } from 'react-use';
import { fetchMovies } from "../services/MovieService.ts";

const Home = () => {

    // State Managers
    const [search, setSearch] = useState<string>("")
    const [searchDebounce, setSearchDebounce] = useState("");

    // Debounce
    useDebounce(() => setSearchDebounce(search.trim()), 500, [search]);

    const {
        data: fetchedMovies,
        isFetching: isFetchingMovies,
        isError: isMoviesError,
        error: movieFetchError
    } = useQuery({
        queryKey: ["Movies", searchDebounce],
        queryFn: () => fetchMovies(searchDebounce),
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

            {isFetchingMovies && (
                <div className="text-green-500 uppercase">
                    <p>Loading. Please wait...</p>
                </div>
            )}

            {fetchedMovies?.length
                ? (
                    <section className="all-movies">
                        <p className="text-red-500 text-2xl font-bold uppercase">
                            {search
                                ? `Search Results for ${search.trim()}`
                                : "Explore Our Wide Range of Movies!"}
                        </p>

                        <ul>
                            {
                                fetchedMovies.map(
                                    (movie: Movie) => <MovieCard key={movie.id} movie={movie} />)
                            }
                        </ul>
                    </section>
                )
                : !isFetchingMovies && (
                    <p className="text-center text-red-600 text-2xl uppercase">No Movies Found!</p>
                )}

        </>
    )
}
export default Home
