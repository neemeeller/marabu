import { useTranslation } from 'next-i18next';
import BookingButton from './BookingButton';
import BookSeatButton from './BookSeatButton';
import CheckInButton from './CheckInButton';
import LogoWhite from './LogoWhite';
import Link from './Link';

const Footer = ({ root = '' }) => {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-coal text-cloud px-5 pt-32">
      <div className="flex max-w-6xl mx-auto flex-col lg:flex-row">
        <div className="w-full max-w-[18rem] lg:w-1/3 border-l px-5 lg:px-10 pb-10">
          <a href={`${root}#marabu`}>
            <LogoWhite />
          </a>
        </div>
        <div className="w-1/3 flex border-l px-5 lg:pb-32 flex-col lg:flex-row lg:gap-10">
          <nav className="">
            <ul>
              <li>
                <a href={`${root}#marabu`} className="hover:text-orange transition-all font-extrabold">
                  {t('Nav.Marabu')}
                </a>
              </li>
              <li>
                <a href={`${root}#destinations`} className="hover:text-orange transition-all font-extrabold">
                  {t('Nav.Destinations')}
                </a>
              </li>
              <li>
                <a href={`${root}#fleet`} className="hover:text-orange transition-all font-extrabold">
                  {t('Nav.Fleet')}
                </a>
              </li>
              <li>
                <a href={`${root}#services`} className="hover:text-orange transition-all font-extrabold">
                  {t('Nav.Services')}
                </a>
              </li>
              <li>
                <a href={`${root}#career`} className="hover:text-orange transition-all font-extrabold">
                  {t('Nav.Career')}
                </a>
              </li>
            </ul>
          </nav>
          <div>
            <ul>
              <li>
                <Link href="/contact" className="hover:text-orange transition-all font-extrabold">
                  {t('Nav.CustomerService')}
                </Link>
              </li>
              <li>
                <a href="mailto:marabu-eu@fgsglobal.com" className="hover:text-orange transition-all font-extrabold">
                  {t('Nav.PressContact')}
                </a>
              </li>
              <li>
                <Link className="hover:text-orange transition-all font-extrabold" href="/gtbc">
                  {t('Nav.Gtbc')}
                </Link>
              </li>
              <li>
                <Link className="hover:text-orange transition-all font-extrabold" href="/passenger-rights">
                  {t('Nav.PassengerRights')}
                </Link>
              </li>
              <li>
                <Link className="hover:text-orange transition-all font-extrabold" href="/imprint">
                  {t('Nav.Imprint')}
                </Link>
              </li>
              <li>
                <Link className="hover:text-orange transition-all font-extrabold" href="/privacy">
                  {t('Nav.Privacy')}
                </Link>
              </li>
              <li dangerouslySetInnerHTML={{ __html: t('LiabilityLink') }}></li>
            </ul>
          </div>
        </div>
        <div className="lg:w-1/3 border-l px-5 flex gap-3 flex-col items-start pb-32 pt-10 lg:pt-0">
          <BookingButton inHeader={false} />
          <BookSeatButton inHeader={false} />
          <CheckInButton inHeader={false} />
          <p className="hover:text-orange transition-all font-extrabold mt-2">
            <span>Hotline:</span> <br />
            <a href="tel:004961716988950">+49 (0) 6171-69889-50</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
