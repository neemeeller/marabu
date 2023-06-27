import { useTranslation } from 'next-i18next';

const BookingButton = ({ small = false, inHeader = true }) => {
  const { t } = useTranslation('common');

  return (
    <>
      <a
        className={`bg-orange border-orange border text-cloud uppercase font-extrabold text-sm text-center tracking-widest inline-block hover:bg-cloud hover:text-orange transition-all ${
          inHeader ? 'py-2 px-4' : 'py-4 px-6'
        }`}
        href={t('Nav.seatBookingLink')}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('Nav.seatBooking')}
      </a>
    </>
  );
};

export default BookingButton;
