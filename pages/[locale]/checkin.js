import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { RawHTML } from 'react-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import LogoLine from '../../components/LogoLine';
import Logo from '../../components/Logo';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';

import bgImage from '../../public/images/HeroImage-002.jpg';
import planeImage from '../../public/images/HeroImage-002b.png';
import CheckInButton from '../../components/CheckInButton';

const Checkin = () => {
  const { t } = useTranslation('checkin');

  return (
    <>
      <Header root="/" />
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 h-full w-full">
          <Image src={bgImage} alt="marabu plane" priority fill className="object-cover h-full w-auto absolute" />
        </div>
        <article className="w-full max-w-6xl mx-auto relative z-20 mt-40 mb-20">
          <div className="grid lg:grid-cols-2 gap-4 p-2">
            <div className="px-5 bg-cloud border std-text mb-10 lg:mb-0">
              <h1 className="headline-1">{t('Title')}</h1>
              <div dangerouslySetInnerHTML={{ __html: t('Text1') }}></div>
              <div dangerouslySetInnerHTML={{ __html: t('Text2') }}></div>
            </div>
            <div className="relative">
              <Image
                src={planeImage}
                alt="marabu plane"
                priority
                className="object-contain h-full w-auto top-0 absolute z-0"
              />
              <div className="z-20 lg:absolute bottom-0 right-0 text-center">
                <div className="mb-10 max-w-[16rem] grid grid-cols-2 content-center mx-auto">
                  <Logo className="text-coal" />
                  <LogoLine style={{ height: '32px' }} />
                </div>
                {/* <CheckInButton inHeader={false} /> */}
              </div>
            </div>
          </div>
        </article>
      </section>
      <Footer root="/" />
    </>
  );
};

export default Checkin;
const getStaticProps = makeStaticProps(['common', 'checkin']);
export { getStaticPaths, getStaticProps };
