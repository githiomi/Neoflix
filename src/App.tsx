import './App.css'
import User from './data/User.ts';
import Home from "./pages/Home.tsx";
import { SEX } from './data/Sex.ts';
import Profile from './pages/Profile.tsx';
import Header from "./components/Header.tsx";
import ErrorComponent from './pages/Error.tsx';
import Favourites from "./pages/Favourites.tsx";
import { Route, Routes } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails.tsx";
import { FavouriteProvider } from "./contexts/FavouriteContext.tsx";

function App() {

    const currentUser: User = {
        profile_image_url: "https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg",
        first_name: "John",
        last_name: "Doe",
        username: "JOHDOE",
        gender: SEX.OTHER,
        email_address: "john.doe@example.com",
        password: "password123"
    }

    return (
        <main className="flex flex-col">

            <Header />

            <section className="content grow">
                <FavouriteProvider>
                    <Routes>
                        <Route index errorElement={<ErrorComponent />} element={<Home />} />
                        <Route path="favourites" element={<Favourites />} />
                        <Route path="profile" element={<Profile user={currentUser} />} />
                        <Route path="details/:movie_id" element={<MovieDetails />} />
                    </Routes>
                </FavouriteProvider>
            </section>

        </main>
    )
}

export default App
