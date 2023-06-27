import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import { getStaticPaths, makeStaticProps } from "../../lib/getStatic";
import { privacyDE, privacyEN } from "../../data/privacy";

const Privacy = () => {
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
                                ? privacyEN
                                : privacyDE,
                    }}
                ></div>
            </main>
            <Footer root="/" />
        </>
    );
};
export default Privacy;

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
