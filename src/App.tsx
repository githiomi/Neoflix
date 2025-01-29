import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Favourites from "./pages/Favourites.tsx";
import Header from "./components/Header.tsx";
import {FavouriteProvider} from "./contexts/FavouriteContext.tsx";

function App() {

    return (
        <main className="flex flex-col">

            <div className="sticky"><Header/></div>

            <section className="content">
                <FavouriteProvider>
                    <Routes>
                        <Route path="/" errorElement={<Home />} element={<Home/>}/>
                        <Route path="/favourites" element={<Favourites/>}/>
                    </Routes>
                </FavouriteProvider>
            </section>

        </main>
    )
}

export default App
