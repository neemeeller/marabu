import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Link from './Link';

const BookingButton = ({ small = false, inHeader = true }) => {
  const { t } = useTranslation('common');
  const [isRedirecting, setIsRedirecting] = useState(false);

  return (
    <>
      <Link
        className={`bg-orange border-orange border text-cloud uppercase font-extrabold text-sm text-center tracking-widest inline-block
                hover:bg-cloud hover:text-orange transition-all ${inHeader ? 'py-2 px-4' : 'py-4 px-6'}`}
        // onClick={handleClick}
        href="/booking"
        target="_blank"
        rel="noopener noreferrer"
      >
        {small ? t('Nav.BookingMobile') : t('Nav.Booking')}
      </Link>
    </>
  );
};

export default BookingButton;
