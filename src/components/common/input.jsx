import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const Input = ({ placeholder, type = 'text', ...props }) => {
  const commonClasses = 'bg-[#EAF0F7] border-none p-2 color-[#4F555A]';

  return type === 'password' ? (
    <Input.Password
      className={commonClasses}
      placeholder={placeholder}
      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      {...props}
    />
  ) : (
    <Input className={commonClasses} placeholder={placeholder} {...props} />
  );
};

export default Input;
