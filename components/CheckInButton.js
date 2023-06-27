import { useTranslation } from 'next-i18next';
import Link from './Link';

const CheckInButton = ({ inHeader = true }) => {
  const { t } = useTranslation('common');

  return (
    <>
      <Link
        className={`bg-orange border-orange border text-cloud uppercase font-extrabold text-center text-sm tracking-widest inline-block no-underline hover:bg-cloud hover:text-orange transition-all ${
          inHeader ? 'py-2 px-4' : 'py-4 px-6'
        }`}
        href={t('Nav.checkinLink')}
        // target="_blank"
        rel="noopener noreferrer"
      >
        {t('Nav.Checkin')}
      </Link>
    </>
  );
};

export default CheckInButton;
