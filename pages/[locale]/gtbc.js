import { useTranslation } from "next-i18next";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { getStaticPaths, makeStaticProps } from "../../lib/getStatic";

const GTBC = () => {
    const { t } = useTranslation("gtbc");
    return (
        <>
            <Header root="/" />
            <main className="my-[110px] max-w-6xl mx-auto py-10 px-5 min-h-[70vh]">
                <div className="max-w-xl">
                    <h1 className="headline-1">{t("Title")}</h1>
                    <h2 className="text-lg font-bold mb-8">{t("Subline")}</h2>
                    <p>{t("Text")}</p>
                    <div className="border-2 p-5 my-8 inline-block">
                        <p
                            className="underline hover:text-orange transition-all"
                            dangerouslySetInnerHTML={{ __html: t("File") }}
                        ></p>
                        <p className="text-sm mt-8">{t("Note")}</p>
                    </div>
                </div>
            </main>
            <Footer root="/" />
        </>
    );
};

export default GTBC;
const getStaticProps = makeStaticProps(["common", "gtbc"]);
export { getStaticPaths, getStaticProps };
