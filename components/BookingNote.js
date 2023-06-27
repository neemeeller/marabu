import { useTranslation } from 'next-i18next';

const BookingNote = ({ note }) => {
  const { t } = useTranslation('common');

  return (
    <div className="absolute z-3 bottom-[31%] right-[-0.8rem] md:bottom-[25%] md:right-[15%] bg-orange rounded-full w-[7rem] h-[7rem] md:w-[10rem] md:h-[10rem] lg:w-[15rem] lg:h-[15rem]">
      <div className="text-center w-full h-full flex justify-center items-center text-cloud font-extrabold text-sm md:text-lg lg:text-2xl">
        <p className="leading-4 lg:leading-8" dangerouslySetInnerHTML={{ __html: t('BookingNote') }}></p>
      </div>
    </div>
  );
};

export default BookingNote;
