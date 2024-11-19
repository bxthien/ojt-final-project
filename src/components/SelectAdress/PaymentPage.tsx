import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-5">
        {/* Steps */}
        <div className="flex justify-center items-center mb-10 gap-24 text-sm">
          {/* Step 1: Address */}
          <div className="flex items-center gap-2 text-gray-400">
            <span className="w-6 h-6 rounded-full bg-green-500 text-center leading-6 text-white font-bold">
              1
            </span>
            <span className="text-gray-600 text-base">Address</span>
          </div>

          {/* Step 2: Shipping */}
          <div className="flex items-center gap-2 text-gray-400">
            <span className="w-6 h-6 rounded-full bg-green-500 text-center leading-6 text-white font-bold">
              2
            </span>
            <span className="text-gray-600 text-base">Shipping</span>
          </div>

          {/* Step 3: Payment */}
          <div className="flex items-center gap-2 text-black">
            <span className="w-6 h-6 rounded-full bg-green-500 text-center leading-6 text-white font-bold">
              3
            </span>
            <span className="font-bold text-base">Payment</span>
          </div>
        </div>

        {/* Layout for Summary and Payment */}
        <div className="flex justify-between items-start gap-10">
          {/* Summary Section */}
          <div className="flex-1 bg-white border border-gray-300 rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-lg mb-5">Summary</h3>
            {/* Items */}
            <div className="mb-6">
              {[
                { name: 'Apple iPhone 14 Pro Max 128Gb', price: 1399 },
                { name: 'AirPods Max Silver', price: 549 },
                { name: 'Apple Watch Series 9 GPS 41mm', price: 399 },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center mb-5 text-base">
                  <span>{item.name}</span>
                  <strong>${item.price}</strong>
                </div>
              ))}
            </div>

            {/* Address and Shipment Method */}
            <div className="mb-6 text-gray-800 text-base">
              <h4 className="text-lg font-bold mb-3">Address</h4>
              <p className="mb-5">1131 Dusty Townline, Jacksonville, TX 40322</p>
              <h4 className="text-lg font-bold mb-3">Shipment method</h4>
              <p>Free</p>
            </div>

            {/* Subtotals */}
            <div className="border-t border-gray-300 pt-5">
              <div className="flex justify-between mb-4 text-base">
                <span>Subtotal</span> <strong>$2347</strong>
              </div>
              <div className="flex justify-between mb-4 text-base">
                <span>Estimated Tax</span> <strong>$50</strong>
              </div>
              <div className="flex justify-between mb-4 text-base">
                <span>Estimated shipping & Handling</span> <strong>$29</strong>
              </div>
              <div className="flex justify-between mt-5 font-bold text-lg">
                <span>Total</span> <strong>$2426</strong>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="flex-1.5 bg-white border border-gray-300 rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-lg mb-5">Payment</h3>
            {/* Payment Tabs */}
            <div className="flex gap-5 mb-6 border-b border-gray-300 pb-4 text-base">
              <div className="font-bold cursor-pointer">Credit Card</div>
              <div className="text-gray-600 cursor-pointer">PayPal</div>
              <div className="text-gray-600 cursor-pointer">PayPal Credit</div>
            </div>
            {/* Credit Card Form */}
            <div className="text-center mb-6">
              <img
                src="src/assets/images/image65.png"
                alt="Credit Card"
                className="mb-5 rounded-lg max-w-full"
              />
            </div>
            <form>
              <input
                type="text"
                placeholder="Cardholder Name"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Exp.Date"
                  className="flex-1 p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="flex-1 p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-5">
                <input type="checkbox" id="billingAddress" className="mr-2" />
                <label htmlFor="billingAddress" className="text-base">
                  Same as billing address
                </label>
              </div>
            </form>

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-5">
              <button
                className="border border-gray-300 py-3 px-6 rounded-lg bg-white text-base cursor-pointer"
                onClick={() => navigate(-1)} // Back to Shipment Method
              >
                Back
              </button>
              <button
                className="bg-green-500 text-white py-3 px-6 rounded-lg text-base cursor-pointer"
                onClick={() => alert('Payment Successful!')}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
