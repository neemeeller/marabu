import { useTranslation } from 'next-i18next';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import FlightUpdateForm from '../../components/FlightUpdateForm';

const FlightUpdate = ({ data }) => {
  const { t } = useTranslation('flightUpdateForm');
  return (
    <>
      <Header root="/" />
      <main className="mt-[110px] pt-10 min-h-[70vh]">
        <div className="my-10 std-text max-w-3xl mx-auto px-5">
          <div className="grid gap-6">
            <div>
              <h2>Flight Information form</h2>
              <p>{t('lead')}</p>
            </div>
          </div>
        </div>
        <div className="grid gap-6 bg-turquoise-dark">
          <FlightUpdateForm data={data} />
        </div>
      </main>
      <Footer root="/" />
    </>
  );
};

export default FlightUpdate;
const getStaticProps = makeStaticProps(['common', 'flightUpdateForm']);
export { getStaticPaths, getStaticProps };
