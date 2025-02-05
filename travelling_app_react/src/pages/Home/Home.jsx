import About from "./About"
import Contact from "./Contact"
import Destinations from "./Destinations"
import Footer from "./Footer"
import Header from "./Header"
import Hero from "./Hero"
import 'C:/Users/PallaviGaikwad/Desktop/Travelling_APP/Travelling_APP_Frontend/travelling_app_react/src/assets/style/home.css'

function Home() {
    return (
        <div className="App">
            <Header />
            <Hero />
            <Destinations />
            <About />
            <Contact />
            <Footer />
        </div>
    )
}

export default Home
