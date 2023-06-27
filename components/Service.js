import Image from 'next/image';

const Service = ({ image, headline, content, className }) => {
  return (
    <article className={`border-l px-5 pb-10 flex items-end flex-col md:flex-row lg:flex-col ${className}`}>
      <Image src={image} alt="title image" className="md:mr-5 md:w-1/2 lg:w-full lg:mr-auto" />
      <div>
        <h2
          className="text-[1.562rem] leading-8 font-extrabold py-5 lg:min-h-[4em] block"
          dangerouslySetInnerHTML={{ __html: headline }}
        ></h2>
        <p dangerouslySetInnerHTML={{ __html: content }} className="pb-8"></p>
      </div>
    </article>
  );
};

export default Service;
