import LanguageSwitchLink from './LanguageSwitchLink';
import { useRouter } from 'next/router';
import { useState } from 'react';

const LanguageSwitch = () => {
  const router = useRouter();

  const [isActive, setIsActive] = useState(false);

  return (
    <div onMouseEnter={() => setIsActive(true)} onMouseLeave={() => setIsActive(false)} className="relative center p-5">
      <span className="uppercase font-extrabold tracking-wider">
        {router.query.locale}
        <span className="inline-block w-2 ml-2  -rotate-90">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.621 12.414">
            <path
              id="Path_4030"
              data-name="Path 4030"
              d="M-6.952,0l-5.5,5.5,5.5,5.5"
              transform="translate(13.866 0.707)"
              fill="none"
              stroke="#fafafa"
              strokeWidth="2"
            />
          </svg>
        </span>
      </span>
      {isActive ? (
        <div className="absolute left-1/2 -translate-x-1/2 bg-coal text-cloud p-5 center font-extrabold tracking-wider">
          {router.query.locale === 'en' ? <LanguageSwitchLink locale="de" /> : ''}
          {router.query.locale === 'de' ? <LanguageSwitchLink locale="en" /> : ''}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
export default LanguageSwitch;
