import { useTranslation } from 'react-i18next';

const exchangeRate = 25000;

const useCurrencyFormatter = () => {
  const { i18n } = useTranslation();

  const formatCurrency = (amount: number): string => {
    if (i18n.language === 'vi') {
      return `${(amount * exchangeRate).toLocaleString('vi-VN')}`;
    } else {
      return `${amount.toFixed(2)}`;
    }
  };

  return { formatCurrency };
};

export default useCurrencyFormatter;
