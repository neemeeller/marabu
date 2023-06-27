import Image from 'next/image';
import { useRouter } from 'next/router';

import mapImageDE from '../public/images/map-de.png';
import mapMobileImageDE from '../public/images/mapMobile-de.png';
import mapImageEN from '../public/images/map-en.png';
import mapMobileImageEN from '../public/images/mapMobile-en.png';

const Destinations = ({ title, description }) => {
  const router = useRouter();

  return (
    <div className="bg-cotton relative">
      <div className="relative">
        {router.query.locale === 'en' ? (
          <>
            <Image src={mapImageEN} alt="map" className="object-fit hidden lg:block" />
            <Image src={mapMobileImageEN} alt="map" className="object-fit lg:hidden" />
          </>
        ) : (
          <>
            <Image src={mapImageDE} alt="map" className="object-cover hidden lg:block" />
            <Image src={mapMobileImageDE} alt="map" className="object-cover lg:hidden" />
          </>
        )}
      </div>
      <article className="w-full bg-cotton p-5 lg:bg-transparent lg:absolute z-20 top-[20%]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-sm">
            <h1 className="headline-1 mb-5">{title}</h1>
            <p className="large-text" dangerouslySetInnerHTML={{ __html: description }}></p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Destinations;
