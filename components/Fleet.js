import Image from 'next/image';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import Link from './Link';

import planeImage from '../public/images/plane.png';

const Fleet = ({ title, description, linkText }) => {
  return (
    <article className="max-w-6xl mx-auto py-32 px-5">
      <h1 className="headline-1 mb-5">{title}</h1>
      <div className="max-w-lg z-10 relative">
        <p className="large-text mb-5">{description}</p>
        <p>
          <Link
            className={`bg-orange border-orange border text-cloud uppercase font-extrabold text-sm text-center tracking-widest inline-block hover:bg-cloud hover:text-orange transition-all py-4 px-6`}
            href="/partner-airlines"
          >
            {linkText}
          </Link>
        </p>
      </div>
      <AnimationOnScroll animateIn="animate__fadeInRight" duration={3} animateOut="animate__fadeOutLeft">
        <Image src={planeImage} alt="marabu plane" className="mt-10 lg:-mt-16" />
      </AnimationOnScroll>
    </article>
  );
};

export default Fleet;
