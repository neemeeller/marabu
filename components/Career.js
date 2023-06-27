import { t } from 'i18next';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import bgImage from '../public/images/career-image-01.jpg';
import bgImageMobile from '../public/images/career-image-01mobile.jpg';

const Career = ({ title, description }) => {
  const { t } = useTranslation('common');
  return (
    <article className="relative min-h-[120vw] lg:min-h-[80vh]">
      <Image src={bgImage} alt="cockpit" fill className="object-cover hidden lg:block" />
      <Image src={bgImageMobile} alt="cockpit" fill className="object-cover lg:hidden" />
      <div className="absolute w-full top-0 lg:bottom-0 lg:top-auto z-20 px-8 max-w-6xl left-1/2 -translate-x-1/2">
        <div className="max-w-md mx-auto py-10 text-cloud lg:mr-0 lg:mb-[10%]">
          <h1 className="headline-1 drop-shadow-lg mb-3">{title}</h1>
          <p className="mb-5 drop-shadow-lg with-link" dangerouslySetInnerHTML={{ __html: description }}></p>
          <a
            href="https://www.career.aero/site/en/job/list/employer/1703-marabu-airlines"
            target="_blank"
            rel="noreferrer"
            className="bg-cloud border-cloud border text-orange uppercase font-extrabold text-sm tracking-widest py-4 px-6 inline-block cursor-pointer
                hover:bg-orange hover:text-cloud transition-all"
          >
            {t('Nav.Apply')}
          </a>
        </div>
      </div>
    </article>
  );
};

export default Career;
