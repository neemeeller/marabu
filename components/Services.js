import { useTranslation } from 'next-i18next';
import Service from './Service';

import image001 from '../public/images/services01.jpg';
import image002 from '../public/images/services02.jpg';
import image003 from '../public/images/services03.jpg';

const Services = () => {
  const { t } = useTranslation('home');

  return (
    <section id="services" className="bg-turquoise-dark">
      <div className="max-w-6xl mx-auto pl-5 pt-16">
        <h1 className="headline-1 border-l px-5 pb-16">{t('Services.Title')}</h1>
        <div className="flex flex-col lg:flex-row">
          <Service
            image={image001}
            headline={t('Services.Content.01.Title')}
            content={t('Services.Content.01.Description')}
            className="w-full lg:w-1/3"
          />
          <Service
            image={image002}
            headline={t('Services.Content.02.Title')}
            content={t('Services.Content.02.Description')}
            className="w-full lg:w-1/3"
          />
          <Service
            image={image003}
            headline={t('Services.Content.03.Title')}
            content={t('Services.Content.03.Description')}
            className="w-full lg:w-1/3"
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
