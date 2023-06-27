import { useTranslation } from "next-i18next";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import { getStaticPaths, makeStaticProps } from "../../lib/getStatic";
import { passengerRightsDE, passengerRightsEN } from "../../data/passengerrights";

const PassengerRights = () => {
    const { t } = useTranslation("common");
    const router = useRouter();

    return (
        <>
            <Header root="/" />
            <main className="my-[110px] max-w-6xl mx-auto py-10 px-5 min-h-[70vh]">
                <div
                    className="mt-10 std-text"
                    dangerouslySetInnerHTML={{
                        __html:
                            router.query.locale === "en"
                                ? passengerRightsEN
                                : passengerRightsDE,
                    }}
                ></div>
            </main>
            <Footer root="/" />
        </>
    );
};
export default PassengerRights;

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
