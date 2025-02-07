import Movie from "../data/Movie.ts";
import MovieCard from "..//components/MovieCard.tsx";
import { useMovieContext } from "../contexts/FavouriteContext.tsx";

const Favourites = () => {

    const { favourites } = useMovieContext();

    if (favourites?.length == 0)
        return (
            <section className="min-h-[80vh] flex flex-row items-center justify-center">
                <h4 className="text-red-500 text-2xl font-bold uppercase text-center" > You haven't added any movies to your favourites yet.</h4>
            </section>
        )

    return (
        <section className="all-movies">
            <h3 className="my-8 text-4xl font-bold uppercase text-center">Your <span className="text-gradient">Favourite</span> Movies</h3>

            <ul>
                {
                    favourites?.map(
                        (movie: Movie) => <MovieCard key={movie.id} movie={movie} />)
                }
            </ul>
        </section>
    )
}
export default Favourites
