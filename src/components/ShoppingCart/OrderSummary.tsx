const OrderSummary = ({ subtotal = 0, tax = 0, shipping = 0, total = 0 }) => {
  return (
    <div className="border border-gray-300 p-8 rounded-lg max-w-sm font-sans shadow-lg bg-white">
      {/* Title */}
      <h2 className="font-bold text-xl mb-5">Order Summary</h2>

      {/* Discount and Bonus Code Section */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Discount code / Promo code"
          className="w-full p-2 mb-3 border border-gray-300 rounded-md text-sm"
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter Card Number"
            className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
          />
          <button className="px-5 py-2 bg-green-500 text-white font-bold rounded-md text-sm hover:bg-green-600">
            Apply
          </button>
        </div>
      </div>

      {/* Subtotals */}
      <div className="mb-5 text-sm leading-6">
        <p className="flex justify-between">
          <span>Subtotal:</span> <strong>${subtotal.toFixed(2)}</strong>
        </p>
        <p className="flex justify-between">
          <span>Estimated Tax:</span> <strong>${tax.toFixed(2)}</strong>
        </p>
        <p className="flex justify-between">
          <span>Estimated shipping & Handling:</span> <strong>${shipping.toFixed(2)}</strong>
        </p>
      </div>

      {/* Total */}
      <h3 className="flex justify-between text-base font-bold mb-5">
        <span>Total:</span> <strong>${total.toFixed(2)}</strong>
      </h3>

      {/* Checkout Button */}
      <button className="w-full py-3 bg-green-500 text-white font-bold rounded-md text-base hover:bg-green-600">
        Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
