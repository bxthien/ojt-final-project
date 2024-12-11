import { useTranslation } from 'react-i18next';

const exchangeRate = 25000;

const useCurrencyFormatter = () => {
  const { i18n } = useTranslation();

  const formatCurrency = (amount: number | string): string => {
    const parsedAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (i18n.language === 'vi') {
      return `${(parsedAmount * exchangeRate).toLocaleString('vi-VN')} VND`;
    } else {
      return `$${parsedAmount.toFixed(2)}`;
    }
  };

  return { formatCurrency };
};

export default useCurrencyFormatter;
