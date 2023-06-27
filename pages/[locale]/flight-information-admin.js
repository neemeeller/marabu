import { useTranslation } from 'next-i18next';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import FlightInformationSearchFrom from '../../components/FlightInformationSearchFrom';

const FlightInformationAdmin = ({ data }) => {
  const { t } = useTranslation('flightUpdateForm');
  return (
    <>
      <Header root="/" />
      <main className="mt-[110px] pt-10 min-h-[70vh]">
        <div className="my-10 std-text max-w-3xl mx-auto px-5">
          <div className="grid gap-6">
            <div>
              <h1>{t('customerFlightInfo')}</h1>
              <FlightInformationSearchFrom />
            </div>
          </div>
        </div>
      </main>
      <Footer root="/" />
    </>
  );
};

export default FlightInformationAdmin;
const getStaticProps = makeStaticProps(['common', 'flightUpdateForm']);
export { getStaticPaths, getStaticProps };
