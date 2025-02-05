import { Movie } from "@/data/Movie"
import '../index.css';
import Image from "./Image";
import { FaStar } from "react-icons/fa";

type MovieCardProps = {
   movie: Movie
};

const MovieCard = ({ movie: { title, vote_average, poster_path, release_date, original_language, adult } }: MovieCardProps) => {
   return (
      <div className="movie-card">

         <Image imageUrl={poster_path} alt={`${title} Poster`} />

         <div className="movie-title flex flex-row gap-4">
            <h3 className="text-red-600 text-xl uppercase">{title}</h3>
            {adult && <span className="movie-extra">PG-13</span>}
         </div>

         <div className="movie-content flex flex-col items-start gap-4">

            <div className="movie-rating flex flex-row gap-4 items-center">
               <FaStar className="text-amber-400" size={20} />
               <p className="text-white font-bold">
                  {vote_average
                     ? vote_average.toFixed(2)
                     : "No Rating Available"}
               </p>
            </div>

            <div className="movie-release flex flex-row items-center gap-4">
               <p className="movie-extra">{original_language}</p>
               <span className="text-amber-400">•</span>
               <p className="year">
                  {release_date
                     ? release_date.split('-')[0]
                     : "No Release Date"}
               </p>
            </div>

         </div>

      </div>
   )
}

export default MovieCard