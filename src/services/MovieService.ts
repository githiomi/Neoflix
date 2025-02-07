import axios from "axios";
import Movie from "../data/Movie";
import Response from "../data/Response";
import { fetchTrendingMovies, updateTrendingMoviesCount } from '../appwrite.ts';

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

   const result = await axios.get(endpoint, API_OPTIONS);

   if (result.status != 200) {
      alert('Error occurred while fetching movies');
      throw new Error('Error occurred while fetching movies');
   }

   const response: Response = await result.data;
   const movies = response.results;

   if (searchQuery && movies.length > 0) {
      updateTrendingMoviesCount(searchQuery, movies[0]);
   }

   return movies;

}

export const getTrendingMovies = async () => {

   return await fetchTrendingMovies();

}