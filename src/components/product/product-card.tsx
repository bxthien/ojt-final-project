import { useNavigate } from 'react-router-dom';
import { Product } from '../home-page/product-list';
import { Image } from 'antd';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { photos, name, price } = product;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/product-detail/${product.id}`, { state: { product } });
  };

  return (
    <div className="bg-[#F6F6F6] shadow-md rounded-lg w-full h-auto p-4 flex flex-col items-center transition-transform hover:scale-105 cursor-pointer">
      <div className="relative w-full pt-[100%] mb-4" onClick={handleNavigate}>
        <Image
          src={
            photos[0]
              ? photos[0]
              : 'https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg'
          }
          alt={name}
          preview={false} // Disable the preview modal
          className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex flex-col items-center flex-grow w-full" onClick={handleNavigate}>
        <h3
          className="text-center text-sm md:text-base font-semibold text-gray-800 line-clamp-2 mb-2"
          onClick={handleNavigate}
        >
          {name}
        </h3>
        <p
          className="text-[#56B280] text-base md:text-lg font-bold mt-auto mb-4"
          onClick={handleNavigate}
        >
          ${price}
        </p>
      </div>
      <button className="bg-[#56B280] text-white w-full py-2 md:py-3 rounded-md transition-colors hover:bg-white hover:text-black border border-transparent hover:border-black text-sm md:text-base">
        Add to Card
      </button>
    </div>
  );
};

export default ProductCard;
