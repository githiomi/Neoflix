import { useState } from "react";
import Movie from "../data/Movie.ts";
import { useDebounce } from 'react-use';
import Banner from "../components/Banner.tsx";
import Search from "../components/Search.tsx";
import { useQuery } from "@tanstack/react-query";
import Trending from "../components/Trending.tsx";
import MovieCard from "../components/MovieCard.tsx";
import { fetchMovies } from "../services/MovieService.ts";

const Home = () => {

    // State Managers
    const [search, setSearch] = useState<string>("")
    const [searchDebounce, setSearchDebounce] = useState("");

    // Debounce
    useDebounce(() => setSearchDebounce(search.trim()), 500, [search]);

    const {
        data: fetchedMovies,
        isPending: isFetchingMovies,
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

            <Trending />

            {isFetchingMovies && (
                <div className="text-gray-500 uppercase text-center">
                    <p>Loading. Please wait...</p>
                </div>
            )}

            {fetchedMovies?.length
                ? (
                    <section className="all-movies">

                        {!search
                            ? <p className="text-white uppercase text-3xl font-bold my-4 text-center">Explore <span className="text-gradient">Movies</span> Now!</p>
                            : <p className="text-white uppercase text-3xl font-bold my-4 text-center">Movie Results for: <span className="text-gradient">{search}</span> </p>
                        }

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
