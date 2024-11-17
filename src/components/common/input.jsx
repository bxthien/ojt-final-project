import { Input } from 'antd';

const Input = ({ placeholder, type = 'text', ...props }) => {
  const commonClasses = 'bg-[#EAF0F7] border-none p-2 color-[#4F555A]';

  return <Input className={commonClasses} placeholder={placeholder} {...props} />;
};

export default Input;
