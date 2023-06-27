import "../styles/globals.scss";
import "animate.css/animate.min.css";

import { Inter } from "next/font/google";

import { appWithTranslation } from "next-i18next";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const MyApp = ({ Component, pageProps }) => {
    return (
        <div className={`${inter.variable} font-sans`}>
            {false ? <p>under construction</p> : <Component {...pageProps} />}
        </div>
    );
};

export default appWithTranslation(MyApp);
