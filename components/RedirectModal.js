import ScaleLoader from 'react-spinners/ScaleLoader';
import LogoLine from './LogoLine';

const override = {
  display: 'inline-block',
  margin: '0 auto',
};

const RedirectModal = ({ text }) => {
  return (
    <div className="fixed z-50 top-0 left-0 right-0 bottom-0 h-screen bg-cloud bg-opacity-10 backdrop-blur-sm">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 bg-cloud rounded-xl p-10 shadow-xl border border-orange text-coal flex justify-center items-center">
        <div className="w-full flex flex-col">
          <div className="mx-auto flex flex-col">
            <div className="w-32 mb-10">
              <LogoLine />
            </div>
            <ScaleLoader
              color="#B14F19"
              height={20}
              width={10}
              radius={5}
              margin={2}
              cssOverride={override}
              aria-label="Loading"
              data-testid="loader"
            />
          </div>
          <h1 className="headline-1 mt-10 uppercase text-center max-w-lg mx-auto">{text}</h1>
        </div>
      </div>
    </div>
  );
};
export default RedirectModal;
