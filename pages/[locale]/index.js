import { useTranslation } from 'next-i18next';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import Hero from '../../components/Hero';
import Fleet from '../../components/Fleet';
import Services from '../../components/Services';

import Destinations from '../../components/Destinations';
import Career from '../../components/Career';

const Homepage = () => {
  const { t } = useTranslation('home');

  return (
    <>
      <Header />
      <main>
        <section id="marabu">
          <Hero text={t('Marabu.Hero')} description={t('Marabu.Description')} />
        </section>
        <section id="destinations">
          <Destinations title={t('Destinations.Title')} description={t('Destinations.Description')} />
        </section>
        <section id="fleet" className="bg-coal text-cloud overflow-hidden">
          <Fleet
            title={t('Fleet.Title')}
            description={t('Fleet.Description')}
            linkText={t('Fleet.PartnerAirlines')}
            linkUrl="/en/partner-airlines"
          />
        </section>
        <Services />
        <section id="career">
          <Career title={t('Career.Title')} description={t('Career.Description')} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Homepage;

const getStaticProps = makeStaticProps(['common', 'home']);
export { getStaticPaths, getStaticProps };
