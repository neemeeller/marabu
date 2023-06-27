import Image from 'next/image';
import { useEffect, useState } from 'react';

import LogoLine from './LogoLine';
import bgImage from '../public/images/HeroImage-002.jpg';

import bgImagePlane from '../public/images/HeroImage-002b.png';
import BookingNote from './BookingNote';
import { t } from 'i18next';

const Hero = ({ text, description }) => {
  const headerHeight = {
    desktop: 100,
  };
  const [offsetTop, setOffsetTop] = useState(100);
  const [position, setPosition] = useState(0);
  const [planeTranslateY, setPlaneTranslateY] = useState(0);
  const [textTranslateY, setTextTranslateY] = useState(0);
  const [scrollPosY, setScrollPosY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const newPos = offsetTop - scrollPos;
      const translateY = scrollPos * 0.4;
      setPlaneTranslateY(translateY);
      const translateTextY = scrollPos * 0.15;
      setTextTranslateY(translateTextY);
    };
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <>
      <article className="relative h-[120vw] lg:h-[120vh] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 h-full w-full">
          <Image src={bgImage} alt="marabu plane" priority fill className="object-cover h-full w-auto absolute" />
          <Image
            src={bgImagePlane}
            alt="marabu plane"
            priority
            fill
            className="object-cover h-full w-auto top-0 absolute z-20"
            style={{
              transform: `translateY(${planeTranslateY}px)`,
            }}
          />
        </div>
        <div className="absolute w-full max-w-6xl left-1/2 -translate-x-1/2 bottom-10 lg:bottom-[20%] p-5">
          <h1
            className="max-w-lg xl:max-w-xl font-extrabold text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] leading-[1.1em]"
            style={{ transform: `translateY(${textTranslateY}px)` }}
          >
            {text}
          </h1>
        </div>
        <BookingNote />
      </article>
      <article>
        <div className="max-w-6xl mx-auto py-10 lg:py-32 flex lg:items-center flex-col lg:flex-row">
          <div className="max-w-[8rem] lg:max-w-[15rem] mb-5 pl-5 lg:pr-10">
            <LogoLine />
          </div>
          <div className="font-extrabold max-w-3xl p-5 lg:pl-20">
            <p className="text-lg lg:text-3xl">{description}</p>
          </div>
        </div>
      </article>
    </>
  );
};

export default Hero;
