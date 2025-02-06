import axios from "axios";
import Response from "../data/Response";
import Movie from "../data/Movie";

// Constants
const API_BASE_URL: string = "https://api.themoviedb.org/3" as string;
const API_KEY: string = import.meta.env.VITE_TMDB_API_TOKEN;
const API_OPTIONS = {
   method: "GET",
   headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`
   }
}

export const fetchMovies = async (searchQuery: string = ""): Promise<Movie[]> => {

   const endpoint: string = searchQuery
      ? `${API_BASE_URL}/search/movie?query=${encodeURI(searchQuery)}}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

   const response = await axios.get(endpoint, API_OPTIONS);
   const movies: Response = await response.data;

   return movies.results;

}