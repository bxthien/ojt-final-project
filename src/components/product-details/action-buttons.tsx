import { Button } from 'antd';

const ActionButtons = () => {
  return (
    <div className="flex gap-4 flex-wrap hover:border hover:rounded-md hover:border-[#3f8d68] hover:bg-white hover:text-[#56B280]">
      {/* Add to Cart Button */}
      <Button
        className="bg-[#56B280] text-white transition-colors rounded-md py-2 px-6 border-none text-lg md:text-base lg:text-base "
        size="large"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ActionButtons;
