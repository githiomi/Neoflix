import '../index.css';
import Movie from "@/data/Movie.ts";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {FaHeart, FaStar} from "react-icons/fa";
import image_fallback from "../assets/images/no-movie.png";
import {useMovieContext} from "../contexts/FavouriteContext.tsx";
import {convertMovieSpecToMovie, fetchMovieById} from "../services/MovieService.ts";

const MovieDetails = () => {

    const {movie_id} = useParams();
    const { isFavourite, addToFavourites, removeFromFavourites } = useMovieContext();

    const {
        data: movie,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["movie", movie_id],
        queryFn: () => fetchMovieById(movie_id!)
    });

    const toggleFavourite = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        const movieDTO : Movie = convertMovieSpecToMovie(movie!);

        if (favouriteStatus) removeFromFavourites(movie!.id)
        else addToFavourites(movieDTO);
    }

    if (isLoading)
        return <div>Loading your trending movies...</div>

    if (isError)
        return <div>Error fetching movie data</div>

    const favouriteStatus = isFavourite(parseInt(movie_id!))
    const image_src: string = movie?.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : image_fallback;
    const rating: number = movie?.vote_average ? (parseInt(movie.vote_average.toFixed(0)) / 2) : 0;
    const genre_length: number = (movie!.genres.length - 1);

    return (
        <section className="min-h-[88vh] flex flex-row items-center justify-center gap-8 p-8">

            <div className="movie-poster flex-1 rounded-3xl border-2 border-red-600 overflow-hidden">
                <img src={image_src} alt={`${movie?.title} Poster`}/>
            </div>

            <div className="movie-details flex-2">
                <p className="text-4xl font-bold tracking-wider">{movie?.title}</p>

                <div className="movie-rating flex flex-row items-center justify-start gap-4">
                    <div className="star-rating flex flex-row gap-0.5">
                        {
                            Array.from({length: 5}, (_, index) => index + 1).map(i => (
                                <FaStar key={i} size={20}
                                        className={`text-lg ${i <= rating ? 'text-yellow-400' : 'text-gray-400'}`}/>
                            ))
                        }
                    </div>

                    <span className="text-amber-400">•</span>

                    <p className="bg-gray-700 text-white rounded text-sm px-2 py-1">{movie?.vote_average.toFixed(1)}</p>

                    <span className="text-amber-400">•</span>

                    <p className="text-gray-500 font-bold">{movie?.vote_count} total ratings</p>
                </div>

                <div className="movie-genres mt-2 mb-4">
                    {
                        movie?.genres.map((genre, index) =>
                            <span
                                className="text-gray-500 italic uppercase font-bold">
                                {genre.name}{index < genre_length ? ',' : ''}
                            </span>)
                    }
                </div>

                <div className="languages">
                    {
                        movie?.spoken_languages.map((language, index) =>
                            <span key={index}
                                  className="text-gray-500 font-bold uppercase">
                                    {language.name}{index < movie?.spoken_languages.length - 1 ? ', ' : ''}
                            </span>)
                    }
                </div>

                <div className="movie-description max-w-[90%] my-4 py-4">
                    <p className="text-lg">
                        {movie?.overview}
                    </p>
                </div>

                <div className="extra-details">
                    <p className="text-gray-500 font-bold">Release Date: <span className="text-gray-700">{movie?.release_date}</span></p>

                    <p className="text-gray-500 font-bold">Runtime: <span className="text-gray-700">{movie?.runtime} minutes</span></p>

                    <p className="text-gray-500 font-bold">Revenue: <span className="text-gray-700">{ new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    }).format(movie!.revenue)}</span></p>
                </div>

                <div className="flex flex-row gap-8 my-4">

                    <div onClick={toggleFavourite}
                        className={`${favouriteStatus ? 'bg-red-500' : 'bg-white'} flex flex-row items-center justify-center p-4 rounded-2xl gap-4 cursor-pointer`}>
                        <FaHeart className={`${favouriteStatus ? 'text-white' : 'text-red-500'}`} size={20} />
                        <p className={`${favouriteStatus ? 'text-white' : 'text-black'} uppercase font-bold`}>{favouriteStatus? 'Remove from Favourites' : 'Add to Favourites'}</p>
                    </div>

                </div>

            </div>
        </section>
    )
}
export default MovieDetails
