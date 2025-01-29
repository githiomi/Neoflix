import {createContext, useState} from "react";
import {Movie} from "../data/Movie.ts";
import * as React from "react";

interface FavouriteValues {
    favourites: Movie[] | null,
    addToFavourites: (favourite: Movie) => void,
    removeFromFavourites: (id: number) => void
}

const initialValues = {
    favourites: null,
    addToFavourites: () => null,
    removeFromFavourites: () => null
}

interface FavouriteProviderProps {
    children: React.ReactNode
}

export const FavouriteContext = createContext<FavouriteValues>(initialValues);

export const FavouriteProvider = (props: FavouriteProviderProps) => {
    const {children} = props;

    const [favourites, setFavourites] = useState<Movie[]>([]);

    const addToFavourites = (movie: Movie): void => {
        setFavourites(prevState => [...prevState, movie]);
    }

    const removeFromFavourites = (id: number) => {
        console.log(id);
        setFavourites(prevState => prevState.filter(movie => movie.id != id))
        return null;
    }

    const returnValues: FavouriteValues = {
        favourites,
        addToFavourites,
        removeFromFavourites
    }

    return (
        <FavouriteContext.Provider value={returnValues}>
            {children}
        </FavouriteContext.Provider>
    )

}