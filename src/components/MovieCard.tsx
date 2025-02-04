import { Movie } from "@/data/Movie"

type MovieCardProps = {
   movie: Movie
};

const MovieCard = ({ movie }: MovieCardProps) => {
   return (
      <div>MovieCard for movie: {movie.title}</div>
   )
}

export default MovieCard