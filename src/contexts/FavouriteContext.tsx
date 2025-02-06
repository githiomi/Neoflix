import { createContext, useContext, useEffect, useState } from "react";
import Movie from "../data/Movie.ts";
import * as React from "react";

interface FavouriteValues {
    favourites: Movie[] | null,
    isFavourite: (id: number) => boolean,
    addToFavourites: (favourite: Movie) => void,
    removeFromFavourites: (id: number) => void
}

const initialValues = {
    favourites: null,
    isFavourite: () => true,
    addToFavourites: () => null,
    removeFromFavourites: () => null
}

interface FavouriteProviderProps {
    children: React.ReactNode
}

const FavouriteContext = createContext<FavouriteValues>(initialValues);

export const useMovieContext = () => useContext(FavouriteContext);

export const FavouriteProvider = (props: FavouriteProviderProps) => {
    const { children } = props;

    const [favourites, setFavourites] = useState<Movie[]>([]);

    useEffect(() => {

        // Get favourites stored in LocalStorage
        const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');

        // Set the favourites state
        setFavourites(storedFavourites);

    }, [])

    useEffect(() => {

        // Saev favourites to Local Storage with change in favourites []
        localStorage.setItem('favourites', JSON.stringify(favourites));

    }, [favourites]);

    const isFavourite = (id: number): boolean => {
        return favourites.some(movie => movie.id === id);
    }

    const addToFavourites = (movie: Movie): void => {
        setFavourites(prevState => [...prevState, movie]);
    }

    const removeFromFavourites = (id: number) => {
        setFavourites(prevState => prevState.filter(movie => movie.id != id));
    }

    const returnValues: FavouriteValues = {
        favourites,
        isFavourite,
        addToFavourites,
        removeFromFavourites
    }

    return (
        <FavouriteContext.Provider value={returnValues}>
            {children}
        </FavouriteContext.Provider>
    )

}