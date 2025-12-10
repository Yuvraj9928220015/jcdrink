import { Helmet } from "react-helmet-async";
import "./Home.css";
import Header from "./Header/Header"
import OurExpertise from "./OurExpertise/OurExpertise";
import NFTMarketplace from "./NFTMarketplace/NFTMarketplace";
import Energizing from "./Energizing/Energizing";
import Nutrition from "./Nutrition/Nutrition"
// import Testimonials from "./Testimonials/Testimonials";

import Main from "./Main/Main";
import ContactSection from "./ContactSection/ContactSection";
export default function Home() {
    return (
        <>
            <Helmet>
                <title>JC Drink – Premium Cold Drinks</title>
                <meta
                    name="description"
                    content="JC Drink offers premium cold drinks, fruit beverages, and refreshing flavors made with pure ingredients. Explore our delicious range crafted for true refreshment."
                />
                <link rel="canonical" href="https://jcdrink.com/" />
            </Helmet>
            <Header />
            <NFTMarketplace />
            <OurExpertise />
            {/* <Testimonials /> */}
            <Energizing />
            <Main />
            <ContactSection/>
            <Nutrition />
        </>
    );
}