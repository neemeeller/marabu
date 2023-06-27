import { useTranslation } from 'next-i18next';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import FlightScheduleForm from '../../components/FlightScheduleForm';

const FlightSchedule = ({ data }) => {
  const { t } = useTranslation('status');
  return (
    <>
      <Header root="/" />
      <main className="my-[110px] py-10 min-h-[70vh]">
        <div className="mt-10 std-text max-w-6xl mx-auto px-5">
          <div className="grid gap-6">
            <div>
              <h2>{t('Title')}</h2>
              <p>{t('Text1')}</p>
            </div>
          </div>
        </div>
        <div className="grid gap-6">
          <FlightScheduleForm data={data} />
        </div>
      </main>
      <Footer root="/" />
    </>
  );
};

export default FlightSchedule;
const getStaticProps = makeStaticProps(['common', 'status']);
export { getStaticPaths, getStaticProps };
