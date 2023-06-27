import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ComplaintForm from '../../components/ComplaintForm';

const Contact = () => {
  const { t } = useTranslation('contact');
  const [isFormOpened, setFormOpened] = useState(false);
  return (
    <>
      <Header root="/" />
      <main className="mt-[110px] min-h-[70vh]">
        <div className="my-10 std-text">
          <div className="grid max-w-4xl mx-auto py-10 px-5">
            <section>
            <h1>{t('title')}</h1>
            <p>{t('subtitle')}</p>
            </section>
            <section>
              <h2>{t('section1.title')}</h2>
              <p>{t('section1.description')}</p>
              <a
                className={`bg-orange border-orange border text-cloud uppercase font-extrabold text-sm text-center tracking-widest inline-block hover:bg-cloud hover:text-orange focus:bg-cloud focus:text-orange no-underline transition-all py-4 px-6`}
                href="https://www.nordica.ee/en/about-the-company/contacts/claim-or-inquiry-form/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('section1.button')}
              </a>
            </section>
          </div>
        </div>
        <section className="bg-turquoise-dark std-text">
          <div className="max-w-4xl mx-auto pt-10 pb-20 px-5">
            <h2>{t('section2.title')}</h2>
            <p>{t('section2.text1')}</p>
            <p>{t('section2.text2')}</p>

            {!isFormOpened ? (
              <Link
                className={`bg-orange border-orange border text-cloud uppercase font-extrabold text-sm text-center tracking-widest inline-block hover:bg-cloud hover:text-orange focus:bg-cloud focus:text-orange no-underline transition-all py-4 px-6`}
                rel="noopener noreferrer"
                onClick={() => setFormOpened(!isFormOpened)}
                href="#complaintForm"
                scroll={false}
              >
                {t('section2.buttonClosed')}
              </Link>
            ) : null}
            {isFormOpened ? (
              <div id="complaintForm">
                <Link
                  className={`bg-orange border-orange border text-cloud font-extrabold text-sm text-center tracking-widest inline-block hover:bg-cloud hover:text-orange focus:bg-cloud focus:text-orange no-underline transition-all py-4 px-6 ${!isFormOpened ? 'uppercase' : ''}`}
                  rel="noopener noreferrer"
                  onClick={() => setFormOpened(!isFormOpened)}
                  href="#complaintForm"
                  scroll={false}
                >
                  {t('section2.buttonOpened')}
                </Link>
                <ComplaintForm closeForm={() => setFormOpened(false)} />
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <Footer root="/" />
    </>
  );
};

export default Contact;
const getStaticProps = makeStaticProps(['common', 'contact', 'complaintForm']);
export { getStaticPaths, getStaticProps };
