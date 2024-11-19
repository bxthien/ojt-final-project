import React, { useState } from 'react';
import { useCheckout } from '../component/CheckoutContext';
import { useNavigate } from 'react-router-dom';
import QRVNPay from '../assets/images/QRVNPay.png';
import MockupIp from '../assets/images/mockupIp.png';

const Payment: React.FC = () => {
  const {
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
  } = useCheckout();

  const navigate = useNavigate();
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingShipping, setIsEditingShipping] = useState(false);

  const [contactInput, setContactInput] = useState(contact);
  const [shippingInput, setShippingInput] = useState(shippingAddress);

  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [qrVisible, setQrVisible] = useState(false);
  const [cardFormVisible, setCardFormVisible] = useState(false);

  const handleSaveContact = () => {
    setContact(contactInput);
    setIsEditingContact(false);
  };
  const handleSaveShipping = () => {
    setShippingAddress(shippingInput);
    setIsEditingShipping(false);
  };

  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    validFrom: '',
    expiryDate: '',
  });

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
    setShowPaymentDetails(method === 'VNPay' || method === 'Stripe');
    setQrVisible(false);
    setCardFormVisible(false);
  };

  const handleCardInput = (field: string, value: string) => {
    setCardInfo({
      ...cardInfo,
      [field]: field === 'cardHolder' ? value.toUpperCase() : value,
    });
  };

  return (
    <div className="flex flex-col md:flex-row p-6 bg-gray-100 min-h-screen">
      <div className="flex-1 bg-white p-6 shadow-md rounded-md">
        <div className="mb-6 text-sm text-gray-500">
          <span>Cart &gt; </span>
          <span>Details &gt; </span>
          <span>Shipping &gt; </span>
          <span className="text-green-500 font-medium">Payment</span>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Contact</h3>
          {isEditingContact ? (
            <div>
              <input
                type="text"
                value={contactInput}
                onChange={(e) => setContactInput(e.target.value)}
                className="w-full p-2 border rounded-md mb-2"
              />
              <button
                onClick={handleSaveContact}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p>{contact || 'No contact information provided.'}</p>
              <button
                onClick={() => setIsEditingContact(true)}
                className="text-green-500 hover:underline"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
          {isEditingShipping ? (
            <div>
              {Object.keys(shippingAddress).map((key) => (
                <input
                  key={key}
                  type="text"
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={shippingInput[key as keyof typeof shippingAddress]}
                  onChange={(e) =>
                    setShippingInput((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded-md mb-2"
                />
              ))}
              <button
                onClick={handleSaveShipping}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p>
                {shippingAddress.name || 'No Name'} {shippingAddress.secondName || ' '}
              </p>
              <p>{shippingAddress.address || 'No Address'}</p>
              <button
                onClick={() => setIsEditingShipping(true)}
                className="text-green-500 hover:underline"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="mb-6 border-b pb-4">
              <h3 className="font-semibold text-lg mb-2">Payment Method</h3>
              <div className="space-y-2">
                {['VNPay', 'Stripe', 'COD'].map((method) => (
                  <label key={method} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => handlePaymentMethodChange(e.target.value)}
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>

              {showPaymentDetails && (
                <div className="mt-4 p-4 border rounded-md bg-gray-50">
                  <h4 className="font-semibold text-md mb-2">Payment Details</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setQrVisible(true);
                        setCardFormVisible(false);
                      }}
                      className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600"
                    >
                      Scan QR Code
                    </button>
                    <button
                      onClick={() => {
                        setQrVisible(false);
                        setCardFormVisible(true);
                      }}
                      className="bg-green-500 text-white w-full py-2 rounded-md hover:bg-green-600"
                    >
                      Enter Card Information
                    </button>
                  </div>

                  {qrVisible && (
                    <div className="mt-4 flex justify-center">
                      <img
                        src={QRVNPay}
                        alt="Spiced Mint Candleaf"
                        className="w-40 h-40 object-contain"
                      />
                    </div>
                  )}

                  {cardFormVisible && (
                    <form className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-semibold">Card Number</label>
                        <input
                          type="text"
                          value={cardInfo.cardNumber}
                          onChange={(e) => handleCardInput('cardNumber', e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold">Card Holder</label>
                        <input
                          type="text"
                          value={cardInfo.cardHolder}
                          onChange={(e) => handleCardInput('cardHolder', e.target.value)}
                          placeholder="CARD HOLDER NAME"
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold">
                            Valid From (MM/YYYY)
                          </label>
                          <input
                            type="text"
                            value={cardInfo.validFrom}
                            onChange={(e) => handleCardInput('validFrom', e.target.value)}
                            placeholder="01/2024"
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold">
                            Expiry Date (MM/YYYY)
                          </label>
                          <input
                            type="text"
                            value={cardInfo.expiryDate}
                            onChange={(e) => handleCardInput('expiryDate', e.target.value)}
                            placeholder="12/2028"
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="bg-green-500 text-white w-full py-2 rounded-md hover:bg-green-600"
                      >
                        Confirm Payment
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Tax Information</h3>
          <input
            type="text"
            placeholder="VAT Number"
            value={taxInformation.vatNumber || ''}
            onChange={(e) => setTaxInformation({ ...taxInformation, vatNumber: e.target.value })}
            className="w-full p-2 border rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="PEC (Optional)"
            value={taxInformation.pec || ''}
            onChange={(e) => setTaxInformation({ ...taxInformation, pec: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Billing Address</h3>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={billingAddress.sameAsShipping}
              onChange={(e) => setBillingAddress({ sameAsShipping: e.target.checked })}
              className="form-checkbox text-green-500"
            />
            <span>Same as the shipping address</span>
          </label>
          {!billingAddress.sameAsShipping && (
            <input
              type="text"
              placeholder="Enter Billing Address"
              className="w-full p-2 border rounded-md mt-2"
            />
          )}
        </div>
        <div className="flex justify-between items-center">
          <button className="text-green-500 hover:underline" onClick={() => navigate('/shipping')}>
            Back to shipping
          </button>
        </div>
      </div>

      <div className="flex-1 mt-8 md:mt-0 md:ml-8 bg-white p-6 shadow-md rounded-md">
        <h2 className="text-lg font-semibold mb-4">Order Information</h2>
        <div className="flex items-center mb-4 border-b pb-4">
          <img src={MockupIp} alt="Spiced Mint Candleaf" className="w-12 h-12 rounded mr-4" />
          <div>
            <h3 className="font-semibold">Spiced Mint Candleaf®</h3>
            <p className="text-green-600">$9.99</p>
          </div>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Coupon code"
            className="w-full p-2 border rounded-md mb-2"
          />
          <button className="bg-gray-300 p-2 rounded-md">Add Code</button>
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>$9.99</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>Free Shipping</span>
          </div>
          <div className="flex justify-between font-semibold text-lg mt-6">
            <span>Total</span>
            <span>$9.99</span>
          </div>
        </div>
        <button className="bg-green-500 text-white w-full mt-6 py-2 rounded-md hover:bg-green-600">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
