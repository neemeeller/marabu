import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';
import { useWindowSize } from '../utils/hooks/useWindowSize';

import BookingButton from './BookingButton';
import BookSeatButton from './BookSeatButton';
import CheckInButton from './CheckInButton';
import LogoWhite from './LogoWhite';
import LanguageSwitch from './LanguageSwitch';
import Navigation from './Navigation/Navigation';

const Header = ({ title, setIsRedirecting, root = '' }) => {
  const { t } = useTranslation('common');
  const size = useWindowSize();

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let lastScrollPos = window.scrollY;

    const handleScroll = () => {
      if (lastScrollPos < window.scrollY && window.scrollY >= 100 && !isOpen) {
        setIsHeaderVisible(false);
      } else if (lastScrollPos > window.scrollY || isOpen) {
        setIsHeaderVisible(true);
      }
      lastScrollPos = window.scrollY;
    };
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <header
        className="h-16 lg:h-auto bg-coal text-cloud p-2 fixed w-full top-0 right-0 left-0 z-50 transition-all"
        style={isHeaderVisible ? { transform: 'translateY(0)' } : { transform: 'translateY(-100%)' }}
      >
        <div className="lg:hidden w-32 h-full flex justify-center">
          <a href={`${root}#marabu`} className="flex items-center w-full h-full">
            <LogoWhite />
          </a>
        </div>
        <div className="hamburger absolute right-0 top-[0.75rem] flex justify-center lg:hidden">
          <button className="relative w-10 h-6 m-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <span
              className={`block w-full h-[2px] bg-cloud absolute top-0 transition-all origin-center ${
                isOpen && 'rotate-45 translate-y-[0.7rem]'
              }`}
            ></span>
            <span
              className={`block w-full h-[2px] bg-cloud absolute top-1/2 -translate-y-1/2 transition-all ${
                isOpen && 'opacity-0'
              }`}
            ></span>
            <span
              className={`block w-full h-[2px] bg-cloud absolute bottom-0 transition-all origin-center ${
                isOpen && '-rotate-45 -translate-y-[0.7rem]'
              }`}
            ></span>
          </button>
        </div>
        <div className="absolute w-full left-0 right-0 flex gap-3 items-end justify-end bg-coal p-2 lg:hidden">
          <BookingButton onPress={setIsRedirecting} small />
          <BookSeatButton small />
          <CheckInButton />
        </div>
        <div
          className={`absolute top-16 left-0 right-0 max-w-[1380px] bg-coal mx-auto lg:flex justify-between content-center w-full transition-all lg:static lg:translate-x-0 ${
            isOpen ? 'translate-x-0' : 'translate-x-[100%]'
          }`}
        >
          <div className="flex flex-wrap content-center border-r px-4">
            <a href={`${root}#marabu`}>
              <LogoWhite style={{ height: '32px' }} />
            </a>
          </div>
          <div className="flex flex-wrap content-center">
            <Navigation root={root} />
          </div>
          <div className="flex justify-center">
            <div>
              <LanguageSwitch />
            </div>
            <div className="hidden lg:flex justify-center items-center gap-3">
              <BookingButton onPress={setIsRedirecting} />
              <BookSeatButton />
              <CheckInButton />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
