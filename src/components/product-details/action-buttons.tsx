import { useNavigate } from 'react-router-dom';
import { Button, notification } from 'antd';
import axiosInstance from '../../services/axios';

type AddToCartButtonProps = {
  productId: string;
  productName: string;
};

const ActionButton = ({ productName }: AddToCartButtonProps) => {
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    const closeNotification = () => {
      notification.destroy();
    };

    if (!isLoggedIn || isLoggedIn !== 'true') {
      // Show notification if not logged in
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
            description: `${productName} has been added to the cart.`,
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
    <button
      onClick={handleAddToCart}
      className="bg-[#56B280] text-white p-2 md:p-3 rounded-lg transition-colors hover:bg-white hover:text-black border border-transparent hover:border-black"
    >
      Add to Cart
    </button>
  );
};

export default ActionButton;
