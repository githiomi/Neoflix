import '../App.css';
import { CSSProperties } from 'react';
import appLogo from '../assets/images/app_logo.png';
import { NavLink, NavLinkRenderProps } from "react-router-dom";
import { FaArrowCircleDown, FaBell, FaSearch } from "react-icons/fa";

const Header = () => {

    const profile_placeholder: string = "https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg";

    const activeLink = ({ isActive }: NavLinkRenderProps): CSSProperties => {
        return isActive
            ? {
                color: "red",
                fontWeight: "bold"
            }
            : {
                color: "white"
            }
    }

    return (
        <div className="flex flex-row items-center justify-between">

            <NavLink to={"/"}>
                <div className="logo brand flex items-center">
                    <img src={appLogo} alt="App Logo" className="logo" />
                    <h3 className="brand-text uppercase text-4xl text-red-600 font-extrabold tracking-wide">Neoflix</h3>
                </div>
            </NavLink>

            <nav>
                <ul className="nav-links uppercase">
                    <NavLink style={activeLink} className="link text-white hover:text-red-500" to='/'>Home</NavLink>
                    <NavLink style={activeLink} className="link text-white hover:text-red-500" to='/favourites'>Favourites</NavLink>
                </ul>
            </nav>

            <div className="user flex flex-row items-center gap-5 mr-20">
                <NavLink to="/">
                    <FaSearch className="icon text-white hover:text-red-500" size={20} />
                </NavLink>
                <FaBell className="icon text-white hover:text-red-500" size={20} />

                <NavLink to="/profile" className="user-profile flex flex-row items-center gap-1">
                    <div className="border-red-600 border-2 rounded-full overflow-hidden">
                        <img src={profile_placeholder} alt="Profile Picture" className="h-[50px] w-[50px]" />
                    </div>
                    <FaArrowCircleDown className='text-red-600' size={15} />
                </NavLink>
            </div>

        </div>
    );

}

export default Header;
