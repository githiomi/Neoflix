import '../index.css';
import banner_image from '../assets/images/hero.png'

const Banner = () => {

    return (
        <div className="py-10">

            <div className="wrapper">
                <header className="text-center uppercase">
                    <h1 className="uppercase text-red-600">Neoflix and Chill</h1>
                    <h3>Watch your <span className="text-gradient">Movies</span> without the hassle of Ads</h3>

                    <img className="banner_image" src={banner_image} alt="Banner Image"/>
                </header>
            </div>

        </div>
    )
}
export default Banner
