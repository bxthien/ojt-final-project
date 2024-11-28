import { Button } from 'antd';

const ActionButtons = () => {
  return (
    <div className="flex gap-4 flex-wrap">
      {/* Buy Now Button */}
      <Button
        className="bg-gray-200 text-black hover:bg-gray-300 transition-colors rounded-md py-2 px-6 text-lg md:text-base lg:text-base"
        size="large"
      >
        Buy Now
      </Button>

      {/* Add to Cart Button */}
      <Button
        className="bg-[#56B280] text-white transition-colors rounded-md py-2 px-6 border-none text-lg md:text-base lg:text-base"
        size="large"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ActionButtons;
