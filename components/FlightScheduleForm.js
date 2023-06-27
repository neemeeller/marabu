import { addDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { Input } from './FormComponents/Input';
import { Notification } from './FormComponents/Notification';
import { Select } from './FormComponents/Select';
import { formatDate, getLocalTime } from './FormComponents/helpers';

const FlightScheduleForm = () => {
  const { t, i18n } = useTranslation('status');
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [day, setDay] = useState(null);
  const [flightNumber, setFlightNumber] = useState(null);

  const [airports, setAirports] = useState([]);
  const [flightSchedule, setFlightSchedule] = useState([]);
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchAirports = async () => {
      const response = await fetch(`/data/airport_codes.json`);
      const newData = await response.json();
      if (!newData) return;

      const airportData = newData.map(({ code, de, en }) => ({
        name: code,
        label: i18n?.language === 'de' ? de : en,
      }));
      setAirports(airportData);
    };

    const fetchFlightSchedule = async () => {
      const response = await fetch(`https://apps.marabu.ee/schedule/est.json`);
      const newData = await response.json();
      if (!newData) return;

      setFlightSchedule(newData?.Data?.ScheduleList);
    };

    fetchAirports();
    fetchFlightSchedule();
  }, [i18n]);

  const getDatesList = () => {
    const currentDate = new Date();
    const today = currentDate;
    const tomorrow = addDays(currentDate, 1);
    const result = [
      { name: today.getUTCDate(), label: formatDate(today, 'dd.MM.yyyy') },
      { name: tomorrow.getUTCDate(), label: formatDate(tomorrow, 'dd.MM.yyyy') },
    ];
    return result;
  };

  const getAirportName = code => airports.find(({ name }) => code === name)?.label;

  const onSubmit = data => {
    const { departureAirport, destinationAirport, date, flightNumber } = data;
    setError('');
    setFrom(departureAirport);
    setTo(destinationAirport);
    setDay(date);
    setFlightNumber(flightNumber);
  };

  return (
    <div className="overflow-auto">
      <div className="w-full bg-turquoise-dark py-5">
        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl bg-turquoise-dark p-5">
            <div>
              <div className="grid sm:grid-cols-2 sm:gap-4">
                <Select
                  id="departureAirport"
                  label={t('departureAirport')}
                  options={airports}
                  error={errors.departureAirport}
                  register={register}
                />
                <Select
                  id="destinationAirport"
                  label={t('destinationAirport')}
                  options={airports}
                  error={errors.destinationAirport}
                  register={register}
                />
              </div>
              <div className="grid sm:grid-cols-2 sm:gap-4">
                <Select id="date" label={t('date')} options={getDatesList()} error={errors.date} register={register} />
                <Input error={errors.flightNumber} id="flightNumber" label={t('flightNumber')} register={register} />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-orange border-orange border text-cloud uppercase font-extrabold text-sm text-center tracking-widest inline-block hover:bg-cloud hover:text-orange transition-all py-4 px-6"
              >
                {t('Filter')}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="my-5 std-text max-w-6xl mx-auto">
        <div className="px-5">
          <p>{t('Text2')}</p>
        </div>
        <div className="overflow-x-auto px-5">
          {to || from || day || flightNumber ? (
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="bg-coal text-cloud">
                  <th>{t('flightNumber')}</th>
                  <th>{t('route')}</th>
                  <th>{t('departure')}</th>
                  <th>{t('arrival')}</th>
                </tr>
              </thead>
              <tbody>
                {flightSchedule
                  .filter(({ FlightNumber }) => (!!flightNumber ? flightNumber === FlightNumber : true))
                  .filter(({ ScheduledDepartureAirport }) => (!!from ? from === ScheduledDepartureAirport : true))
                  .filter(({ ScheduledArrivalAirport }) => (!!to ? to === ScheduledArrivalAirport : true))
                  .filter(({ ScheduledArrivalDateTime, ScheduledDepartureDateTime }) =>
                    !!day
                      ? day == new Date(ScheduledArrivalDateTime).getUTCDate() ||
                        day === new Date(ScheduledDepartureDateTime).getUTCDate()
                      : true
                  )
                  .map(
                    ({
                      EstimatedArrivalDateTime,
                      EstimatedDepartureDateTime,
                      FlightNumber,
                      LegNumber,
                      OffsetAa,
                      OffsetDa,
                      ScheduledArrivalAirport,
                      ScheduledArrivalDateTime,
                      ScheduledDepartureAirport,
                      ScheduledDepartureDateTime,
                      TailSign,
                    }) => {
                      const onTimeArrival = !EstimatedArrivalDateTime;
                      const onTimeDeparture = !EstimatedDepartureDateTime;
                      return (
                        <tr key={LegNumber}>
                          <td>{FlightNumber}</td>
                          <td>
                            <strong>
                              {getAirportName(ScheduledDepartureAirport)} - {getAirportName(ScheduledArrivalAirport)}
                            </strong>
                            <br />
                            <span>{TailSign}</span>
                          </td>
                          <td>
                            <div className={onTimeDeparture ? '' : 'text-warning'}>
                              {formatDate(getLocalTime(ScheduledDepartureDateTime, OffsetDa))}{' '}
                              <strong>{ScheduledDepartureAirport}</strong>
                            </div>
                            <div>
                              <strong className={onTimeDeparture ? 'text-success' : 'text-warning'}>
                                {onTimeDeparture ? t('ontime') : t('delayed')}
                              </strong>
                            </div>
                            {!onTimeDeparture && (
                              <div>
                                {formatDate(getLocalTime(EstimatedDepartureDateTime, OffsetDa))}{' '}
                                <strong>{ScheduledDepartureAirport}</strong>
                              </div>
                            )}
                          </td>
                          <td>
                            <div className={onTimeArrival ? '' : 'text-warning'}>
                              {formatDate(getLocalTime(ScheduledArrivalDateTime, OffsetAa))}{' '}
                              <strong>{ScheduledArrivalAirport}</strong>
                            </div>
                            <div>
                              <strong className={onTimeArrival ? 'text-success' : 'text-warning'}>
                                {onTimeArrival ? t('ontime') : t('delayed')}
                              </strong>
                            </div>
                            {!onTimeArrival && (
                              <div>
                                {formatDate(getLocalTime(EstimatedArrivalDateTime, OffsetAa))}{' '}
                                <strong>{ScheduledArrivalAirport}</strong>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          ) : (
            ''
          )}
          {error ? <Notification type={'error'} message={t('generalError')} /> : null}
        </div>
      </div>
    </div>
  );
};

export default FlightScheduleForm;
