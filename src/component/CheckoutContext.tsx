import React, { createContext, useContext, useState } from 'react';

interface CheckoutContextType {
  contact: string;
  shippingAddress: {
    name: string;
    secondName: string;
    address: string;
    city: string;
    postalCode: string;
    province: string;
    country: string;
  };
  paymentMethod: string;
  taxInformation: {
    vatNumber: string;
    pec: string;
  };
  billingAddress: {
    sameAsShipping: boolean;
    address?: string;
  };
  setContact: (contact: string) => void;
  setShippingAddress: (address: CheckoutContextType['shippingAddress']) => void;
  setPaymentMethod: (method: string) => void;
  setTaxInformation: (info: CheckoutContextType['taxInformation']) => void;
  setBillingAddress: (address: CheckoutContextType['billingAddress']) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contact, setContact] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    secondName: '',
    address: '',
    city: '',
    postalCode: '',
    province: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [taxInformation, setTaxInformation] = useState({ vatNumber: '', pec: '' });
  const [billingAddress, setBillingAddress] = useState({ sameAsShipping: true });

  return (
    <CheckoutContext.Provider
      value={{
        contact,
        shippingAddress,
        paymentMethod,
        taxInformation,
        billingAddress,
        setContact,
        setShippingAddress,
        setPaymentMethod,
        setTaxInformation,
        setBillingAddress,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
