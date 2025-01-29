import {FaSearch} from "react-icons/fa";
import * as React from "react";
import {Dispatch, SetStateAction} from "react";

type TSearchProps = {
    setSearchTerm : Dispatch<SetStateAction<string>>
}

const Search = ({setSearchTerm} : TSearchProps) => {


    const handleSearch = (event : React.ChangeEvent<HTMLInputElement>)=> {
        event.preventDefault();
        const value = event.target.value;
        setSearchTerm(value)
        console.log(value)
    }

    return (

        <>
            <div className="flex flex-row items-center gap-5 border-2 border-red-600 w-[30%] mx-auto p-3 rounded-2xl ">
                <FaSearch size={20} className="text-red-600"/>
                <input className="search-input grow" type="text" placeholder="Search for any movie..." onChange={handleSearch} />

            </div>


        </>

    )
}
export default Search
