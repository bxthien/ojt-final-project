import { Image } from 'antd';
import Iphone16 from '../../assets/images/Iphone16-hero.png';
import { heroData } from '../../constants/data';
import Button from '../common/button';

const Hero = () => {
  return (
    <div className="mx-auto">
      <div className="bg-[#211C24] text-white">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
          {/* Mobile Layout */}
          <div className="block md:hidden text-center animate-fadeIn">
            <p className="text-sm text-gray-400 pt-28">{heroData.tagline}</p>
            <h2 className="text-6xl sm:text-7xl animate-slideUp">
              {heroData.heading} <span className="font-bold">{heroData.subHeading}</span>
            </h2>
            <p className="text-sm text-gray-300 mb-10 animate-slideUp">{heroData.description}</p>
            <Button text={heroData.buttonText} to="/product" className="animate-slideUp" />
            <div className="mt-10">
              <Image
                className="w-full max-w-[350px] mx-auto h-20 mt-10 object-contain animate-slideUp"
                src={Iphone16}
                preview={false}
              />
            </div>
          </div>

          {/* Desktop/Tablet Layout */}
          <div className="hidden md:flex md:flex-row items-center animate-fadeIn">
            <div className="w-full md:w-3/5 lg:w-4/5 px-4 md:px-8 lg:px-14 animate-slideUp">
              <p className="text-base text-gray-400">{heroData.tagline}</p>
              <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[90px] leading-tight">
                {heroData.heading} <span className="font-bold">{heroData.subHeading}</span>
              </h2>
              <p className="text-base text-gray-300 max-w-md mb-10">{heroData.description}</p>
              <Button text={heroData.buttonText} to="/product" />
            </div>
            <div className="w-full md:w-2/5 lg:w-2/5 flex justify-center items-center ml-1 md:ml-4 lg:ml-20 mt-4 md:mt-8 lg:mt-12">
              <Image
                className="w-full max-w-full h-auto object-contain animate-slideUp"
                src={Iphone16}
                preview={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
