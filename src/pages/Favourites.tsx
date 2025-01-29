import {useContext, useState} from "react";
import {FavouriteContext} from "../contexts/FavouriteContext.tsx";
import {Movie} from "../data/Movie.ts";

const Favourites = () => {

    const [counter, setCounter] = useState(1);
    const favouritesContext = useContext(FavouriteContext);
    const {favourites, addToFavourites, removeFromFavourites} = favouritesContext;

    const addFavourite = () => {
        const movie : Movie = {
            id: counter,
            title: `Movie ${counter}`
        }

        setCounter( prev => prev + 1);

        addToFavourites(movie);
    }

    const removeFavourite = () => {
        removeFromFavourites(counter);
    }

    return (
        <>
            <div>Favourites</div>

            <div>
                <h3 className="text-2xl font-bold">These are your favourites</h3>

                {favourites != null
                ? favourites?.map( favourite => <li key={favourite.id}>{favourite.title}</li>)
                : <h4 className="text-red-500">You have no favourites</h4>}
            </div>

            <button onClick={() => addFavourite()} value="Add Movie" >Add</button>

            <button onClick={() => removeFavourite()} value="Remove Favourite" >Remove</button>
        </>
    )
}
export default Favourites
