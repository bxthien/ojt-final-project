import { Button } from 'antd';

const ActionButtons = () => {
  return (
    <div className="hover:border hover:rounded-md hover:border-[#3f8d68] hover:text-[#56B280]">
      {/* Add to Cart Button */}
      <Button
        className="bg-[#56B280] text-white rounded-md  border-none text-lg md:text-base lg:text-base "
        size="large"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ActionButtons;
