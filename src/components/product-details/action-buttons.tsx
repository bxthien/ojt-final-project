const ActionButtons = () => {
  return (
    <div className="flex gap-4">
      <button className="bg-gray-200 text-black py-2 px-4 rounded-md hover:bg-gray-300">
        Buy Now
      </button>
      <button className="bg-[#56B280] text-white py-2 px-4 rounded-md hover:bg-green-700">
        Add to Cart
      </button>
    </div>
  );
};

export default ActionButtons;
