import React from 'react';

interface ProductColumnProps {
  image: string;
  title: string;
  description: string;
  backgroundColor: string;
}

const ProductColumn: React.FC<ProductColumnProps> = ({
  image,
  title,
  description,
  backgroundColor,
}) => {
  return (
    <div className="w-1/4">
      <div className={`flex flex-col h-full  last:pr-0 ${backgroundColor} p-6`}>
        <div className="h-[280px] mb-6 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-contain" />
        </div>

        <div className="flex flex-col flex-grow">
          <h2 className="text-xl font-semibold h-[28px] mb-3">{title}</h2>

          <p className="text-sm text-gray-600 mb-4 h-[80px] leading-relaxed">{description}</p>

          <div className="mt-auto">
            <button className="w-[120px] px-5 py-2 border border-gray-300 rounded-lg hover:bg-[#56B280] transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductColumn;
