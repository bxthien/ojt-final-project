import { useNavigate } from 'react-router-dom';
import { Product } from '../home-page/product-list';
import { Button, Image, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../../services/axios';
import { useAuth } from '../../hook/useAuth';
import ShoppingCartOutlined from '@ant-design/icons/lib/icons/ShoppingCartOutlined';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { name, price, url } = product;
  const isAuth = useAuth();

  const handleNavigate = () => {
    navigate(`/product-detail/${product.id}`, { state: { product } });
  };

  const handleAddToCart = async () => {
    const closeNotification = () => {
      notification.destroy();
    };

    if (!isAuth) {
      notification.open({
        message: t('actionButton.notLoggedInMessage'),
        description: t('actionButton.loginRequired'),
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
              {t('actionButton.signInButton')}
            </Button>
          </div>
        ),
        onClose: () => console.log('Notification Closed'),
      });
    } else {
      try {
        const res = await axiosInstance.post(`/cart`, { productId: product.id });
        if (res) {
          notification.success({
            message: t('actionButton.addedToCartSuccessMessage'),
            description: `${product.name} ${t('actionButton.addedToCartSuccessDescription')}`,
          });
        }
      } catch (error) {
        notification.error({
          message: t('actionButton.addToCartErrorMessage'),
          description: t('actionButton.addToCartErrorDescription'),
        });
        console.error('Add to Cart Error:', error);
      }
    }
  };

  return (
    <div
      className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border
       border-gray-100 bg-white shadow-md hover:border-[#56B280] hover:border-1 cursor-pointer"
      onClick={handleNavigate}
    >
      <div className="relative flex h-48 max-h-48 min-h-48 items-start justify-center overflow-hidden">
        <Image
          src={
            url
              ? url
              : 'https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg'
          }
          alt={name}
          preview={false}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="p-3">
        <a href="#">
          <h5 className="text-xl tracking-tight text-slate-900">{name}</h5>
        </a>
        <div className="flex items-center mt-1">
          {Array(5)
            .fill('')
            .map((_, index) => (
              <svg
                key={index}
                aria-hidden="true"
                className="h-3 w-3 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 
                0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 
                1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 
                1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                ></path>
              </svg>
            ))}
          <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-[10px] font-semibold">
            5.0
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p>
            <span className="text-xl font-medium text-red-500">{price.toFixed(2)} $</span>
          </p>
          <a
            onClick={handleAddToCart}
            href="#"
            className="flex items-center justify-center rounded-md text-center font-medium text-whitefocus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <Button
              onClick={handleAddToCart}
              className=" text-[#56B280] border-gray-400 flex items-center justify-center transition-colors hover:bg-white hover:text-black border-transparent p-0"
              aria-label="Add to Cart"
              type="link"
            >
              <ShoppingCartOutlined className="text-xl sm:text-2xl" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
