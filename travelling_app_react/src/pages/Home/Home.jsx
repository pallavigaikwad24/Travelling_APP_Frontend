import About from "../../component/HomeComponent/About"
import Contact from "../../component/HomeComponent/Contact"
import Destinations from "../../component/HomeComponent/Destinations"
import Footer from "../../component/HomeComponent/Footer"
import Header from "../../component/HomeComponent/Header"
import Hero from "../../component/HomeComponent/Hero"
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
