import { useNavigate } from 'react-router-dom';
import { Product } from '../home-page/product-list';
import { Button, Image, notification } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import axiosInstance from '../../services/axios';

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

  const handleAddToCart = async () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    const closeNotification = () => {
      notification.destroy();
    };

    if (!isLoggedIn || isLoggedIn !== 'true') {
      // Nếu người dùng chưa đăng nhập, hiển thị thông báo yêu cầu đăng nhập
      notification.open({
        message: 'You are not logged in yet',
        description: 'Login is required to add products to cart.',
        btn: (
          <div>
            <Button
              className="bg-[#56B280] text-white"
              onClick={() => {
                navigate('/sign-in');
                closeNotification();
              }}
              style={{ marginRight: 8 }}
            >
              Sign In
            </Button>
          </div>
        ),
        onClose: () => console.log('Notification Closed'),
      });
    } else {
      try {
        const res = await axiosInstance.get(`/cart`);
        if (res) {
          notification.success({
            message: 'Added to cart successfully!',
            description: `${product.name} has been added to the cart.`,
          });
        }
      } catch (error) {
        notification.error({
          message: 'Error while adding to cart',
          description: 'An error occurred while adding products to the cart.',
        });
        console.error('Add to Cart Error:', error);
      }
    }
  };

  return (
    <div
      className="bg-[#F6F6F6] shadow-md w-full 
    cursor-pointer 
    flex flex-col items-center overflow-hidden
    transition-all duration-300 
    hover:border-[#56B280] hover:border-2 
    border-2 border-transparent"
    >
      {/* Image Section */}
      <div className="relative justify-center items-center" onClick={handleNavigate}>
        <Image
          src={
            url
              ? url
              : 'https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg'
          }
          alt={name}
          preview={false}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details Section */}
      <div className="flex flex-row w-full px-2 py-1 justify-between items-center ">
        {/* Name and Price Column */}
        <div className="flex flex-col items-start flex-grow">
          <h3
            className="text-left text-xs sm:text-sm font-semibold text-gray-800 
       line-clamp-2 mb-0.5 cursor-pointer hover:text-gray-600"
            onClick={handleNavigate}
          >
            {name}
          </h3>
          <p
            className="text-[#56B280] text-sm sm:text-base font-bold cursor-pointer"
            onClick={handleNavigate}
          >
            ${price.toFixed(2)}
          </p>
        </div>

        {/* Add to Cart Button Column */}
        <div className="flex items-center justify-center">
          <button
            onClick={handleAddToCart}
            className=" text-[#56B280] border-gray-400 flex items-center justify-center 
       p-1.5 sm:p-2 rounded-lg transition-colors 
       hover:bg-white hover:text-black 
       border border-transparent hover:border-black"
            aria-label="Add to Cart"
          >
            <ShoppingCartOutlined className="text-base sm:text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
