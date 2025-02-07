import * as React from "react";
import { FaSearch } from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";

type TSearchProps = {
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>
}

const Search = ({ searchTerm, setSearchTerm }: TSearchProps) => {

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const value = event.target.value;
        setSearchTerm(value)
    }

    return (
        <>
            <div className="flex flex-row items-center gap-5 border-2 border-red-600 w-[30%] mx-auto p-3 rounded-2xl mb-8">
                <FaSearch size={20} className="text-red-600" />
                <input className="search-input grow" type="text" placeholder="Search for any movie..." value={searchTerm} onChange={handleSearch} />
            </div>
        </>
    )
}

export default Search
