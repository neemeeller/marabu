import { useTranslation } from 'next-i18next';
import NavLink from './NavLink';

const Navigation = ({ root = '' }) => {
  const { t, i18n: { language } } = useTranslation('common');
  return (
    <nav>
      <ul className="flex flex-col items-start lg:flex-row uppercase">
        <NavLink href={`${root}#marabu`} label={t('Nav.Marabu')} />
        <NavLink href={`${root}#destinations`} label={t('Nav.Destinations')} />
        {/* <NavLink href={`/${language}/flight-schedule`} label={t('Nav.FlightSchedule')} /> */}
        <NavLink href={`${root}#fleet`} label={t('Nav.Fleet')} />
        <NavLink href={`${root}#services`} label={t('Nav.Services')} />
      </ul>
    </nav>
  );
};

export default Navigation;
