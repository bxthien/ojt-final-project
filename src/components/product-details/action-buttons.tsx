import { useNavigate } from 'react-router-dom';
import { Button, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../../services/axios';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

type AddToCartButtonProps = {
  productId: string;
  productName: string;
  quantity: number;
};

export type Error = {
  response: {
    data: {
      message: string;
    };
  };
};

const ActionButton = ({ productId, productName, quantity }: AddToCartButtonProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  let userId = localStorage.getItem('userId');

  const handleAddToCart = async () => {
    const closeNotification = () => {
      notification.destroy();
    };

    if (userId?.startsWith('"') && userId.endsWith('"')) {
      userId = userId.slice(1, -1);
    }

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
        const res = await axiosInstance.post(`/cart/add`, {
          userId,
          productId,
          quantity,
        });
        if (res) {
          notification.success({
            message: t('actionButton.addedToCartSuccessMessage'),
            description: `${productName} ${t('actionButton.addedToCartSuccessDescription')}`,
          });
        }
      } catch (error) {
        notification.error({
          message: t('actionButton.addToCartErrorMessage'),
          description: t('actionButton.addToCartErrorDescription'),
          // description: error.response.data.message,
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
      {t('actionButton.addToCartButton')}
    </button>
  );
};

export default ActionButton;
