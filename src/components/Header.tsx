import appLogo from '../assets/images/app_logo.png';
import '../App.css'
import { NavLink } from "react-router-dom";
import { FaBell, FaSearch } from "react-icons/fa";

const Header = () => {

    const profile_placeholder: string = "https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg";

    return (
        <div className="flex flex-row items-center justify-between">

            <div className="logo brand flex items-center">

                <img src={appLogo} alt="App Logo" className="logo" />

                <h3 className="brand-text uppercase text-4xl text-red-600 font-extrabold tracking-wide">Neoflix</h3>

            </div>

            <nav>
                <ul className="nav-links uppercase">
                    <NavLink className={`link text-white hover:text-red-500`} to='/'>Home</NavLink>
                    <NavLink className="link text-white hover:text-red-500" to='/favourites'>Favourites</NavLink>
                </ul>
            </nav>

            <div className="user flex flex-row items-center gap-5 mr-20">
                <FaSearch className="icon text-white hover:text-red-500" size={20} />
                <FaBell className="icon text-white hover:text-red-500" size={20} />

                <div className="user-profile">
                    <img src={profile_placeholder} alt="Profile Picture" className="h-[50px] w-[50px]" />
                </div>
            </div>

        </div>
    );

}

export default Header;
