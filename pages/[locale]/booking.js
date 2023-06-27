import { useTranslation } from "next-i18next";
import Header from "../../components/Header";
import { getStaticPaths, makeStaticProps } from "../../lib/getStatic";
import { useEffect } from "react";
import Hero from "../../components/Hero";
import ScaleLoader from "react-spinners/ScaleLoader";
import LogoLine from "../../components/LogoLine";

const override = {
    display: "inline-block",
    margin: "0 auto",
};

const Booking = () => {
    const { t } = useTranslation("common");

    useEffect(() => {
        setTimeout(() => {
            window.location.href = t("Nav.bookinglink");
        }, 3000);
    }, [t]);
    return (
        <>
            <Header root="/" />
            <main className=" pointer-events-none">
                <section className="fixed overflow-hidden w-full min-h-screen">
                    <Hero />
                </section>
                <section className="fixed z-50 top-0 left-0 right-0 bottom-0 h-screen backdrop-grayscale backdrop-brightness-110 pointer-events-none">
                    <div className="bg-coal fixed top-0 bottom-0 left-0 right-0 w-full h-full bg-opacity-80"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 bg-cloud rounded-sm p-10 shadow-xl text-coal flex justify-center items-center">
                        <div className="w-full flex flex-col">
                            <div className="mx-auto flex flex-col">
                                <div className="w-32 mb-10">
                                    <LogoLine />
                                </div>
                                <ScaleLoader
                                    color="#B14F19"
                                    height={20}
                                    width={10}
                                    radius={5}
                                    margin={2}
                                    cssOverride={override}
                                    aria-label="Loading"
                                    data-testid="loader"
                                />
                            </div>
                            <h1 className="mt-10 text-center max-w-lg mx-auto">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: t("Redirecting"),
                                    }}
                                ></p>
                            </h1>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Booking;
const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
