import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Link from '../../components/Link';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';

const GTBC = () => {
  const { t } = useTranslation('partnerAirlines');
  const [tab, setTab] = useState('Tab1');
  return (
    <>
      <Header root="/" />
      <main className="my-[110px] max-w-6xl mx-auto py-10 px-5 min-h-[70vh]">
        <div className="mb-10">
          <h1 className="headline-1">Partner Airlines</h1>
        </div>
        <div className="border-b border-gray-200">
          <ul className={`flex flex-wrap -mb-px text-sm font-medium text-center`}>
            <li className="mr-2">
              <a
                href="#"
                className={`inline-flex p-4 border-2 group uppercase font-extrabold text-sm text-center border-orange ${
                  tab === 'Tab1'
                    ? 'active bg-orange border-orange text-cloud'
                    : 'text-orange border-transparent hover:bg-cloud hover:border-orange hover:text-orange'
                }`}
                onClick={() => setTab('Tab1')}
              >
                {t('Tab1.Label')}
              </a>
            </li>
            <li className="mr-2">
              <a
                href="#"
                className={`inline-flex p-4 border-2 group uppercase font-extrabold text-sm text-center border-orange ${
                  tab === 'Tab2'
                    ? 'active bg-orange border-orange text-cloud'
                    : 'text-orange border-transparent hover:bg-cloud hover:border-orange hover:text-orange'
                }`}
                aria-current="page"
                onClick={() => setTab('Tab2')}
              >
                {t('Tab2.Label')}
              </a>
            </li>
          </ul>
        </div>
        <div className="my-10 std-text">
          <p>
            <a href={t(`${tab}.PartnerWebsiteUrl`)} target="_blank" className='inline-block'>
              <Image src={t(`${tab}.LogoPath`)} alt={t(`${tab}.Title`)} width={250} height={80} />
            </a>
          </p>
          <h2 className="headline-1">{t(`${tab}.Title`)}</h2>
          <h3 className="text-lg font-bold mb-8">{t(`${tab}.Subtitle`)}</h3>
          <p>{t(`${tab}.Text`)}</p>
          <p>
            {t(`${tab}.Text1`)}
            <a href={`mailto:${t(`${tab}.ContactEmail`)}`}>{t(`${tab}.ContactEmail`)}</a>
          </p>
          <div className="overflow-x-auto mt-8 max-w-4xl" dangerouslySetInnerHTML={{ __html: t(`${tab}.Table`) }}></div>
          <h3>{t(`${tab}.Heading2`)}</h3>
          <p>{t(`${tab}.Text2`)}</p>
          <p>
            <Link href="/gtbc">{t(`${tab}.Terms&ConditionsText`)}</Link>
          </p>
          <p>
            <a href={t(`${tab}.PartnerWebsiteUrl`)} target="_blank">
              {t(`${tab}.PartnerWebsiteText`)}
            </a>
          </p>
        </div>
      </main>
      <Footer root="/" />
    </>
  );
};

export default GTBC;
const getStaticProps = makeStaticProps(['common', 'partnerAirlines']);
export { getStaticPaths, getStaticProps };
