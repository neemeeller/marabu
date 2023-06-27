import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { Input } from './FormComponents/Input';
import { Notification } from './FormComponents/Notification';
import { Select } from './FormComponents/Select';
import { postData } from './api/helper';

const FlightInformationSearchFrom = () => {
  const { t, i18n } = useTranslation('flightUpdateForm');
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flightNumbers, setFlightNumbers] = useState([]);

  useEffect(() => {
    const fetchFlightSchedule = async () => {
      const response = await fetch(`https://apps.marabu.ee/schedule/est.json`);
      const newData = await response.json();
      if (!newData) return;

      const flightSchedule = newData?.Data?.ScheduleList || [];
      const flightNumbers = [...new Set(flightSchedule.map(d => d.FlightNumber).sort())];

      setFlightNumbers([...new Set(flightNumbers)]);
    };

    fetchFlightSchedule();
  }, [i18n]);

  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ flightNumber, flightDate }) => {
    setError('');
    setLoading(true);
    const response = await postData('https://eo82f4e5ovn1bh8.m.pipedream.net', { flightNumber, flightDate });
    if (!response.ok) {
      return setError(
        `${response.status} Something went wrong while fetching data. Please change search criteria or try again later`
      );
    }
    const data = await response?.json();
    setTableData(data);
    setLoading(false);
  };

  return (
    <div className="overflow-auto">
      <div className="w-full bg-turquoise-dark py-5">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl bg-turquoise-dark p-5">
            <div>
              <div className="grid sm:grid-cols-3 sm:gap-4 content-center">
                <Input
                  disabled={loading}
                  error={errors.flightDate}
                  id="flightDate"
                  label={t('flightDate')}
                  register={register}
                  type="date"
                />
                <Select
                  disabled={loading || flightNumbers?.lenght === 0}
                  error={errors.flightNumber}
                  id="flightNumber"
                  label={t('flightNumber')}
                  options={flightNumbers.map(n => ({ key: n, name: n, label: n }))}
                  register={register}
                  required
                />
                <div className="mb-4 grid" style={{ alignContent: 'flex-end' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-orange border-orange border text-cloud uppercase font-extrabold text-sm text-center tracking-widest inline-block hover:bg-cloud hover:text-orange transition-all py-2 px-4"
                  >
                    {t('Search')}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="my-5 std-text max-w-6xl mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="bg-coal text-cloud">
                <th>{t('flightDate')}</th>
                <th>{t('flightNumber')}</th>
                <th>{t('routing')}</th>
                <th>{t('contactPerson')}</th>
                <th>{t('mobilePhone')}</th>
                <th>{t('email')}</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                tableData?.map((d, idx) => (
                  <tr key={idx}>
                    <td>{d.flightDate}</td>
                    <td>{d.flightNumber}</td>
                    <td>{d.routing}</td>
                    <td>{d.contactPerson}</td>
                    <td>{d.mobilePhone}</td>
                    <td>{d.email}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="mt-4">
            {!loading && tableData?.length === 0 ? <Notification type={'error'} message={t('No data found')} /> : null}
            {loading ? <Notification type={'error'} message={t('Please Wait! Loading...')} /> : null}
            {error ? <Notification type={'error'} message={t('generalError')} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightInformationSearchFrom;
