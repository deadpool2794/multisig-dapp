import Header from "../_components/Header/page";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home",
};

const HomePage = () => {
    return <Header />;
};

export default HomePage;
