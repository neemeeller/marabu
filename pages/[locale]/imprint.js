import { useTranslation } from "next-i18next";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { getStaticPaths, makeStaticProps } from "../../lib/getStatic";

const Imprint = () => {
    const { t } = useTranslation("imprint");
    return (
        <>
            <Header root="/" />
            <main className="my-[110px] max-w-6xl mx-auto py-10 px-5 min-h-[70vh]">
                <h1 className="headline-1">{t("Title")}</h1>
                <div className="mt-10">
                    <p>
                        <span className="font-extrabold">Name:</span> Marabu
                        Airlines OÜ
                    </p>
                    <p>
                        <span className="font-extrabold">
                            Management Board:
                        </span>{" "}
                        Paul Schwaiger (CEO), Tony Larsson (COO)
                    </p>
                    <p>
                        <span className="font-extrabold">Registry code:</span>{" "}
                        16621081
                    </p>
                    <p>
                        <span className="font-extrabold">Contact address:</span>{" "}
                        Lennujaama tee 13, Tallinn, 11101, Estonia
                    </p>
                    <p>
                        <span className="font-extrabold">Email:</span>{" "}
                        <a href="mailto:service@marabu.ee">service@marabu.ee</a>
                    </p>
                    <p>
                        <span className="font-extrabold">Website:</span>{" "}
                        www.flymarabu.com
                    </p>
                </div>
            </main>
            <Footer root="/" />
        </>
    );
};

export default Imprint;
const getStaticProps = makeStaticProps(["common", "imprint"]);
export { getStaticPaths, getStaticProps };
