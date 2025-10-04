import "./Home.css";
import Header from "./Header/Header"
import OurExpertise from "./OurExpertise/OurExpertise";
import NFTMarketplace from "./NFTMarketplace/NFTMarketplace";
import Energizing from "./Energizing/Energizing";
import Nutrition from "./Nutrition/Nutrition"
// import Testimonials from "./Testimonials/Testimonials";
import Contact from "../Contact/Contact"
import Main from "./Main/Main";
// import Potential from "./Potential/Potential";
// import Map from "./Map/Map";
export default function Home() {
    return (
        <>
            <Header />
            <NFTMarketplace />
            <OurExpertise />
            {/* <Testimonials /> */}
            <Energizing />
            {/* <Potential/> */}
            {/* <Map/> */}
            <Main />
            <Contact />
            <Nutrition />
        </>
    );
}