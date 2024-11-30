import { useNavigate } from 'react-router-dom';
import { Product } from '../home-page/product-list';
import { Image } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  // const { name, price, url } = product;
  const navigate = useNavigate();
  const { name, price, url } = product;

  const handleNavigate = () => {
    navigate(`/product-detail/${product.id}`, { state: { product } });
  };

  return (
    <div className="bg-[#F6F6F6] shadow-md rounded-md w-full h-auto p-6 flex flex-col items-center transition-transform hover:scale-105 cursor-pointer">
      {/* Image Section */}
      <div className="relative mb-4 justify-center items-center" onClick={handleNavigate}>
        <Image
          src={
            url
              ? url
              : 'https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg'
          }
          alt={name}
          preview={false}
          className="rounded-sm"
          width="100%"
          height={200}
        />
      </div>

      {/* Details Section */}
      <div className="flex flex-row w-full justify-between items-start md:items-center gap-4">
        {/* Name and Price Column */}
        <div className="flex flex-col items-start w-full md:w-3/4">
          <h3
            className="text-left text-sm md:text-base font-semibold text-gray-800 line-clamp-2 mb-2"
            onClick={handleNavigate}
          >
            {name}
          </h3>
          <p className="text-[#56B280] text-base md:text-lg font-bold" onClick={handleNavigate}>
            ${price}
          </p>
        </div>

        {/* Add to Cart Button Column */}
        <div className="flex items-center justify-center w-full md:w-1/4">
          <button
            // onClick={handleAddToCart}
            className="bg-[#56B280] text-white flex items-center justify-center p-2 md:p-3 rounded-full transition-colors hover:bg-white hover:text-black border border-transparent hover:border-black"
            aria-label="Add to Cart"
          >
            <ShoppingCartOutlined className="text-lg md:text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
