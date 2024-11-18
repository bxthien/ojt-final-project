import { useState, useEffect, useRef } from 'react';
import { Image } from 'antd';
import PlayStation from '../../assets/images/PlayStation.png';
import HeadPhone from '../../assets/images/headphone.png';
import AppleVision from '../../assets/images/applevision.png';
import MacBook from '../../assets/images/MacBook.png';
import Button from '../common/button';
import { productData } from '../../constants/data';

type IntersectionObserverOptions = {
  threshold: number | number[];
};

const useIntersectionObserver = (options: IntersectionObserverOptions) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setIsVisible(true);
        setHasAnimated(true);
      }
    }, options as IntersectionObserverInit);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasAnimated, options]);

  return [isVisible, elementRef] as const;
};

const ProductGrid = () => {
  const [isVisible1, ref1] = useIntersectionObserver({ threshold: 0.5 });
  const [isVisible2, ref2] = useIntersectionObserver({ threshold: 0.5 });
  const [isVisible3, ref3] = useIntersectionObserver({ threshold: 0.5 });
  const [isVisible4, ref4] = useIntersectionObserver({ threshold: 0.5 });

  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* First Column (Product 1 and Product 2) */}
        <div className="grid grid-rows-2">
          <div className={`bg-white ${isVisible1 ? 'animate-fadeIn' : ''}`} ref={ref1}>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <Image
                className="w-full object-contain"
                src={PlayStation}
                alt="PlayStation"
                preview={false}
              />
              <div className="text-center md:text-left">
                <h2 className="text-3xl mb-5 md:text-5xl font-semibold">
                  {productData.product1.name}
                </h2>
                <p className="text-sm text-[#909090]">
                  {productData.product1.description}
                  <br />
                  {productData.product1.description2}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className={`bg-[#EDEDED] ${isVisible2 ? 'animate-slideUp' : ''}`} ref={ref2}>
              <div className="flex flex-col md:flex-row items-center justify-between mt-8">
                <div className="flex-1 flex justify-center md:justify-start">
                  <Image
                    className="w-full object-contain"
                    src={HeadPhone}
                    alt="AirPods Max"
                    preview={false}
                  />
                </div>
                <div className="text-center md:text-left flex-1">
                  <h2 className="text-3xl font-semibold">{productData.product2.name}</h2>
                  <p className="text-sm text-[#909090]">{productData.product2.description}</p>
                </div>
              </div>
            </div>

            <div
              className={`bg-[#353535] text-white ${isVisible3 ? 'animate-fadeIn' : ''}`}
              ref={ref3}
            >
              <div className="flex flex-col md:flex-row items-center justify-between mt-10">
                <div className="flex-1 flex justify-center md:justify-start">
                  <Image
                    className="w-full object-contain"
                    src={AppleVision}
                    alt="Apple Vision"
                    preview={false}
                  />
                </div>
                <div className="text-center md:text-left flex-1">
                  <h2 className="text-3xl font-semibold">{productData.product3.name}</h2>
                  <p className="text-sm text-[#909090]">{productData.product3.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Main Column (Product 4) */}
        <div className={`bg-white ${isVisible4 ? 'animate-slideUp' : ''}`} ref={ref4}>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 mt-32">
            <div className="justify-center md:justify-start mt-4 md:mt-0 p-6 md:p-14">
              <h2 className="text-3xl mb-5 md:text-5xl font-semibold">
                {productData.product4.name}
              </h2>
              <p className="text-sm text-[#909090] mb-8">{productData.product4.description}</p>
              <Button
                text={productData.buttonText}
                to="/product"
                className="text-black border-black"
              />
            </div>
            <Image
              className="w-full h-auto md:w-4/5 lg:w-3/4 xl:w-2/3 object-contain mt-6"
              src={MacBook}
              alt="Macbook"
              preview={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
